import { NextResponse } from "next/server";

// High-performance neural translation helper using Google's public translation API
async function translateText(text, targetLang) {
  if (!text || !text.toString().trim()) return "";
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text.toString())}`;
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
      return data[0]
        .map((item) => item[0])
        .filter(Boolean)
        .join("")
        .trim();
    }
    return text;
  } catch (err) {
    console.error(`[Translate API Fail en -> ${targetLang}]:`, err.message);
    return text; // Safe fallback to English text in case of connection limits
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, subCategory, subDetail, protocol, tip, science, freqs } = body;

    const TARGET_LANGS = ["hi", "es", "fr", "ar", "ja"];
    const translations = {};

    // Execute translation packages for all target languages in parallel
    await Promise.all(
      TARGET_LANGS.map(async (lang) => {
        // 1. Core text translation block
        const [
          tTitle,
          tSubCat,
          tSubDet,
          tProtocol,
          tTip,
          tScience
        ] = await Promise.all([
          translateText(title, lang),
          translateText(subCategory, lang),
          translateText(subDetail, lang),
          translateText(protocol, lang),
          translateText(tip, lang),
          translateText(science, lang)
        ]);

        // Reconstruct the formatted 'sub' property: Sub-Category · Pathway Detail
        const subFormatted = tSubCat + (tSubDet ? " · " + tSubDet : "");

        // 2. Frequencies/phases array translation block
        let tFreqs = [];
        if (Array.isArray(freqs) && freqs.length > 0) {
          tFreqs = await Promise.all(
            freqs.map(async (freq) => {
              const [fLabel, fEffect] = await Promise.all([
                translateText(freq.label, lang),
                translateText(freq.effect, lang)
              ]);
              return {
                ...freq,
                label: fLabel || freq.label,
                effect: fEffect || freq.effect
              };
            })
          );
        }

        // 3. Assemble language specific payload
        translations[lang] = {
          title: tTitle || title,
          sub: subFormatted || subCategory,
          protocol: tProtocol || protocol,
          tip: tTip || tip,
          science: tScience || science,
          freqs: tFreqs
        };
      })
    );

    return NextResponse.json({ success: true, translations });
  } catch (error) {
    console.error("Translation API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
