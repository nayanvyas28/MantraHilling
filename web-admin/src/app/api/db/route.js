import { getAdminClient } from "../../../lib/supabase";
import { NextResponse } from "next/server";

// High-performance neural translation helper using Google's public translation API
async function translateTextArray(stringsArray, targetLang) {
  if (!stringsArray || stringsArray.length === 0) return [];
  const separator = " ::: ";
  const joined = stringsArray.map(s => s ? s.toString().trim() : "").join(separator);
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(joined)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    if (!res.ok) {
      throw new Error(`Translation status returned ${res.status}`);
    }

    const data = await res.json();
    if (data && data[0]) {
      const translatedJoined = data[0]
        .map((item) => item[0])
        .filter(Boolean)
        .join("")
        .trim();
      
      const parts = translatedJoined.split(/\s*:::\s*/);
      return stringsArray.map((orig, idx) => {
        if (!orig) return "";
        return parts[idx] ? parts[idx].trim() : orig;
      });
    }
    return stringsArray;
  } catch (err) {
    console.error(`[Admin Auto-Translate en -> ${targetLang}]:`, err.message);
    return stringsArray;
  }
}

// Translate all details of a condition in a single batch query per language to prevent rate limits
async function generateTranslationsForCondition(data) {
  const title = data.title || "";
  const subVal = data.sub || "";
  let subCategory = subVal;
  let subDetail = "";
  if (subVal.includes("·")) {
    const parts = subVal.split("·");
    subCategory = parts[0].trim();
    subDetail = parts.slice(1).join("·").trim();
  }
  const instruments = data.instruments || "";
  const protocol = data.protocol || "";
  const tip = data.tip || "";
  const science = data.science || "";
  
  let freqs = data.freqs || [];
  if (typeof freqs === 'string') {
    try { freqs = JSON.parse(freqs); } catch(_) { freqs = []; }
  }

  // Compile full array to send in single request
  const stringsToTranslate = [
    title,
    subCategory,
    subDetail,
    instruments,
    protocol,
    tip,
    science
  ];

  freqs.forEach(f => {
    stringsToTranslate.push(f.label || "");
    stringsToTranslate.push(f.effect || "");
  });

  const TARGET_LANGS = ["hi", "es", "fr", "ar", "ja"];
  const translations = {};

  await Promise.all(
    TARGET_LANGS.map(async (lang) => {
      const translatedStrings = await translateTextArray(stringsToTranslate, lang);
      
      const tTitle = translatedStrings[0] || title;
      const tSubCat = translatedStrings[1] || subCategory;
      const tSubDet = translatedStrings[2] || subDetail;
      const tInstruments = translatedStrings[3] || instruments;
      const tProtocol = translatedStrings[4] || protocol;
      const tTip = translatedStrings[5] || tip;
      const tScience = translatedStrings[6] || science;

      const subFormatted = tSubCat + (tSubDet ? " · " + tSubDet : "");

      const tFreqs = freqs.map((freq, idx) => {
        const labelIdx = 7 + idx * 2;
        const effectIdx = 8 + idx * 2;
        return {
          ...freq,
          label: translatedStrings[labelIdx] || freq.label,
          effect: translatedStrings[effectIdx] || freq.effect
        };
      });

      translations[lang] = {
        title: tTitle,
        sub: subFormatted,
        instruments: tInstruments,
        protocol: tProtocol,
        tip: tTip,
        science: tScience,
        freqs: tFreqs
      };
    })
  );

  return translations;
}

export async function POST(request) {
  try {
    let { table, action, data, query } = await request.json();

    if (!table || !action) {
      return NextResponse.json({ error: "Table and Action are required." }, { status: 400 });
    }

    // Auto-generate translations for conditions table operations
    if (table === "conditions" && (action === "insert" || action === "update" || action === "upsert")) {
      try {
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            if (!data[i].translations || Object.keys(data[i].translations).length === 0) {
              data[i].translations = await generateTranslationsForCondition(data[i]);
            }
          }
        } else if (data) {
          if (!data.translations || Object.keys(data.translations).length === 0) {
            data.translations = await generateTranslationsForCondition(data);
          }
        }
      } catch (transErr) {
        console.error("Auto-translate hook error in admin client:", transErr.message);
      }
    }

    const adminClient = getAdminClient();
    let queryBuilder = adminClient.from(table);

    let result;
    if (action === "insert") {
      result = await queryBuilder.insert(data).select();
    } else if (action === "update") {
      let q = queryBuilder.update(data);
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          q = q.eq(key, value);
        });
      }
      result = await q.select();
    } else if (action === "delete") {
      let q = queryBuilder.delete();
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          q = q.eq(key, value);
        });
      }
      result = await q.select();
    } else if (action === "upsert") {
      result = await queryBuilder.upsert(data).select();
    } else {
      return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
    }

    const { data: responseData, error } = result;

    if (error) {
      console.error(`Admin DB Error (${action} on ${table}):`, error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Admin DB API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
