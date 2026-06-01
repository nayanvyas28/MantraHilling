const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const env = require('../load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

class DummyWebSocket {}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: DummyWebSocket }
});

const TARGET_LANGS = ['hi', 'es', 'fr', 'ar', 'ja'];

const BASE_LANGS = {
  en: {
    code: "en", flag: "🇬🇧", name: "English", dir: "ltr",
    tagline: "Heal with Sound", sub: "Ancient frequencies. Modern science.", search: "Search conditions, frequencies…",
    aiDiagnose: "AI Diagnose",
    selectLang: "Choose your language", free: "Free", pro: "Pro", divine: "Divine", monthly: "/ mo", yearly: "/ yr",
    save: "Save 40%", mostPop: "Most Popular", bestVal: "Best Value", upgrade: "Upgrade to Pro", tryFree: "Try Free",
    currentPlan: "Current Plan", unlock: "Unlock All 22+ Conditions", planLabel: "Your Plan", sessLeft: "sessions left",
    unlimited: "Unlimited", home: "Home", explore: "Explore", library: "Library", plans: "Plans", you: "You",
    featured: "Sound Remedies", trending: "Trending", goodMorn: "Good morning", goodAft: "Good afternoon", goodEve: "Good evening",
    streakDays: "Day Streak 🔥", protocol: "Protocol", tip: "Expert Tip", science: "Science", instruments: "Instruments",
    startSession: "Start Session", pause: "Pause", resume: "Resume", stop: "Stop", nowPlaying: "Now Playing",
    frequencies: "Frequencies", freqMap: "Solfeggio Map", brainwaves: "Brainwaves", allConditions: "All Conditions",
    continue: "Continue", binaural: "Binaural Beats", volume: "Volume", playing: "Playing", selectFreq: "Tap to play individually",
    tier_free: ["5 sessions / month", "5 healing conditions", "432 Hz + 528 Hz basics", "Standard audio quality", "Supported by ads"],
    tier_pro: ["Unlimited sessions", "All 22+ conditions", "Full Solfeggio library (174–963 Hz)", "Offline downloads", "Lossless HD audio", "Zero ads", "Sleep timer + reminders", "Progress tracking & streaks"],
    tier_divine: ["Everything in Pro", "AI-powered frequency diagnosis", "Personalized weekly programs", "Live group sound baths", "1:1 therapist sessions (2/mo)", "Family plan — 4 users", "Priority support 24/7"],
    priceM: "₹299", priceY: "₹1,999", divM: "₹799", divY: "₹5,999", freeP: "₹0"
  },
  hi: {
    code: "hi", flag: "🇮🇳", name: "हिंदी", dir: "ltr",
    tagline: "ध्वनि से उपचार", sub: "प्राचीन आवृत्तियाँ। आधुनिक विज्ञान।", search: "स्थिति, आवृत्तियाँ खोजें…",
    aiDiagnose: "AI निदान",
    selectLang: "भाषा चुनें", free: "निःशुल्क", pro: "प्रो", divine: "दिव्य", monthly: "/ माह", yearly: "/ वर्ष",
    save: "40% बचाएं", mostPop: "सबसे लोकप्रिय", bestVal: "सर्वश्रेष्ठ", upgrade: "प्रो में अपग्रेड करें", tryFree: "निःशुल्क आज़माएं",
    currentPlan: "वर्तमान योजना", unlock: "22+ स्थितियाँ अनलॉक करें", planLabel: "आपकी योजना", sessLeft: "सत्र शेष",
    unlimited: "असीमित", home: "होम", explore: "अन्वेषण", library: "पुस्तकालय", plans: "योजनाएं", you: "आप",
    featured: "ध्वनि चिकित्सा", trending: "लोकप्रिय", goodMorn: "सुप्रभात", goodAft: "शुभ अपराह्न", goodEve: "शुभ संध्या",
    streakDays: "दिन की श्रृंखला 🔥", protocol: "प्रोटोकॉल", tip: "विशेषज्ञ टिप", science: "विज्ञान", instruments: "वाद्ययंत्र",
    startSession: "सत्र शुरू करें", pause: "रोकें", resume: "जारी रखें", stop: "बंद करें", nowPlaying: "अभी चल रहा है",
    frequencies: "आवृत्तियाँ", freqMap: "सोल्फेगियो मानचित्र", brainwaves: "मस्तिष्क तरंगें", allConditions: "सभी स्थितियाँ",
    continue: "जारी रखें", binaural: "बाइनॉरल बीट्स", volume: "वॉल्यूम", playing: "चल रहा है", selectFreq: "व्यक्तिगत रूप से चलाएं",
    tier_free: ["5 सत्र / माह", "5 उपचार स्थितियाँ", "432 Hz + 528 Hz मूल", "सामान्य ऑडियो", "विज्ञापन समर्थित"],
    tier_pro: ["असीमित सत्र", "सभी 22+ स्थितियाँ", "पूर्ण सोल्फेगियो", "ऑफलाइन डाउनलोड", "HD ऑडियो", "विज्ञापन मुक्त", "स्लीप टाइमर", "प्रगति ट्रैकिंग"],
    tier_divine: ["प्रो की सभी सुविधाएं", "AI निदान", "व्यक्तिगत कार्यक्रम", "लाइव साउंड बाथ", "1:1 थेरेपिस्ट", "पारिवारिक योजना", "प्राथमिकता सहायता"],
    priceM: "₹299", priceY: "₹1,999", divM: "₹799", divY: "₹5,999", freeP: "₹0"
  },
  es: {
    code: "es", flag: "🇪🇸", name: "Español", dir: "ltr",
    tagline: "Sana con el Sonido", sub: "Frecuencias antiguas. Ciencia moderna.", search: "Buscar condiciones…",
    aiDiagnose: "Diagnóstico IA",
    selectLang: "Elige tu idioma", free: "Gratis", pro: "Pro", divine: "Divino", monthly: "/ mes", yearly: "/ año",
    save: "Ahorra 40%", mostPop: "Más Popular", bestVal: "Mejor Valor", upgrade: "Actualizar a Pro", tryFree: "Prueba Gratis",
    currentPlan: "Plan Actual", unlock: "Desbloquear 22+ Condiciones", planLabel: "Tu Plan", sessLeft: "sesiones restantes",
    unlimited: "Ilimitado", home: "Inicio", explore: "Explorar", library: "Biblioteca", plans: "Planes", you: "Tú",
    featured: "Remedios de Sonido", trending: "Tendencias", goodMorn: "Buenos días", goodAft: "Buenas tardes", goodEve: "Buenas noches",
    streakDays: "Días seguidos 🔥", protocol: "Protocolo", tip: "Consejo Experto", science: "Ciencia", instruments: "Instrumentos",
    startSession: "Iniciar", pause: "Pausar", resume: "Reanudar", stop: "Detener", nowPlaying: "Reproduciendo",
    frequencies: "Frecuencias", freqMap: "Mapa Solfeggio", brainwaves: "Ondas Cerebrales", allConditions: "Todas las Condiciones",
    continue: "Continuar", binaural: "Beats Binaurales", volume: "Volumen", playing: "Reproduciendo", selectFreq: "Toca para reproducir",
    tier_free: ["5 sesiones / mes", "5 condiciones", "Frecuencias básicas", "Calidad estándar", "Con anuncios"],
    tier_pro: ["Sesiones ilimitadas", "22+ condiciones", "Biblioteca Solfeggio", "Offline", "Audio HD", "Sin anuncios", "Temporizador", "Seguimiento"],
    tier_divine: ["Todo de Pro", "Diagnóstico IA", "Programas personalizados", "Baños sonoros", "Sesiones 1:1", "Plan familiar", "Soporte 24/7"],
    priceM: "€4.99", priceY: "€34.99", divM: "€9.99", divY: "€69.99", freeP: "€0"
  },
  fr: {
    code: "fr", flag: "🇫🇷", name: "Français", dir: "ltr",
    tagline: "Guérissez par le Son", sub: "Fréquences anciennes. Science moderne.", search: "Rechercher…",
    aiDiagnose: "Diagnostic IA",
    selectLang: "Choisissez votre langue", free: "Gratuit", pro: "Pro", divine: "Divin", monthly: "/ mois", yearly: "/ an",
    save: "Économisez 40%", mostPop: "Plus Populaire", bestVal: "Meilleur Rapport", upgrade: "Passer à Pro", tryFree: "Essai Gratuit",
    currentPlan: "Plan Actuel", unlock: "Débloquer 22+ Conditions", planLabel: "Votre Plan", sessLeft: "séances restantes",
    unlimited: "Illimité", home: "Accueil", explore: "Explorer", library: "Bibliothèque", plans: "Abonnements", you: "Vous",
    featured: "Remèdes Sonores", trending: "Tendances", goodMorn: "Bonjour", goodAft: "Bon après-midi", goodEve: "Bonsoir",
    streakDays: "Jours consécutifs 🔥", protocol: "Protocole", tip: "Conseil Expert", science: "Science", instruments: "Instruments",
    startSession: "Démarrer", pause: "Pause", resume: "Reprendre", stop: "Arrêter", nowPlaying: "En cours",
    frequencies: "Fréquences", freqMap: "Carte Solfeggio", brainwaves: "Ondes Cérébrales", allConditions: "Toutes les Conditions",
    continue: "Continuer", binaural: "Beats Binauraux", volume: "Volume", playing: "En lecture", selectFreq: "Appuyer pour écouter",
    tier_free: ["5 séances / mois", "5 conditions", "Fréquences de base", "Qualité standard", "Avec publicités"],
    tier_pro: ["Séances illimitées", "22+ conditions", "Bibliothèque complète", "Hors ligne", "HD", "Sans pub", "Minuterie", "Suivi"],
    tier_divine: ["Tout du Pro", "Diagnostic IA", "Programmes", "Bains sonores", "Sessions 1:1", "Famille", "Support 24/7"],
    priceM: "€4,99", priceY: "€34,99", divM: "€9,99", divY: "€69,99", freeP: "€0"
  },
  ar: {
    code: "ar", flag: "🇸🇦", name: "العربية", dir: "rtl",
    tagline: "الشفاء بالصوت", sub: "ترددات قديمة. علم حديث.", search: "ابحث عن الحالات…",
    aiDiagnose: "تشخيص الذكاء الاصطناعي",
    selectLang: "اختر لغتك", free: "مجاني", pro: "برو", divine: "إلهي", monthly: "/ شهر", yearly: "/ سنة",
    save: "وفر 40%", mostPop: "الأكثر شعبية", bestVal: "أفضل قيمة", upgrade: "ترقية إلى برو", tryFree: "جرب مجاناً",
    currentPlan: "الخطة الحالية", unlock: "فتح 22+ حالة", planLabel: "خطتك", sessLeft: "جلسات متبقية",
    unlimited: "غير محدود", home: "الرئيسية", explore: "استكشاف", library: "المكتبة", plans: "الخطط", you: "أنت",
    featured: "العلاجات الصوتية", trending: "رائج", goodMorn: "صباح الخير", goodAft: "مساء الخير", goodEve: "مساء النور",
    streakDays: "أيام متتالية 🔥", protocol: "البروتوكول", tip: "نصيحة الخبير", science: "العلم", instruments: "الآلات",
    startSession: "بدء", pause: "إيقاف", resume: "استئناف", stop: "إيقاف تام", nowPlaying: "يعزف الآن",
    frequencies: "الترددات", freqMap: "خريطة سولفيجيو", brainwaves: "موجات الدماغ", allConditions: "جميع الحالات",
    continue: "متابعة", binaural: "نبضات ثنائية", volume: "الصوت", playing: "يعزف", selectFreq: "اضغط للتشغيل",
    tier_free: ["5 جلسات / شهر", "5 حالات", "ترددات أساسية", "جودة عادية", "مع إعلانات"],
    tier_pro: ["غير محدود", "22+ حالة", "مكتبة كاملة", "بدون إنترنت", "HD", "بدون إعلانات", "مؤقت", "تتبع"],
    tier_divine: ["كل برو", "ذكاء اصطناعي", "برامج مخصصة", "حمامات صوتية", "1:1", "عائلة", "دعم 24/7"],
    priceM: "$4.99", priceY: "$34.99", divM: "$9.99", divY: "$69.99", freeP: "$0"
  },
  ja: {
    code: "ja", flag: "🇯🇵", name: "日本語", dir: "ltr",
    tagline: "音で癒す", sub: "古代の周波数。現代の科学。", search: "症状・周波数を検索…",
    aiDiagnose: "AI診断",
    selectLang: "言語を選択", free: "無料", pro: "プロ", divine: "神聖", monthly: "/ 月", yearly: "/ 年",
    save: "40%節約", mostPop: "人気No.1", bestVal: "最高コスパ", upgrade: "Proにアップグレード", tryFree: "無料で試す",
    currentPlan: "現在のプラン", unlock: "22+症状を解放", planLabel: "あなたのプラン", sessLeft: "セッション残り",
    unlimited: "無制限", home: "ホーム", explore: "探索", library: "ライブラリ", plans: "プラン", you: "あなた",
    featured: "音響療法", trending: "トレンド", goodMorn: "おはようございます", goodAft: "こんにちは", goodEve: "こんばんは",
    streakDays: "日連続 🔥", protocol: "プロトコル", tip: "専門家のヒント", science: "科学", instruments: "楽器",
    startSession: "開始", pause: "一時停止", resume: "再開", stop: "停止", nowPlaying: "再生中",
    frequencies: "周波数", freqMap: "ソルフェジオマップ", brainwaves: "脳波", allConditions: "すべての症状",
    continue: "続ける", binaural: "バイノーラルビート", volume: "音量", playing: "再生中", selectFreq: "タップして再生",
    tier_free: ["5セッション / 月", "5つの症状", "基本周波数", "標準音質", "広告あり"],
    tier_pro: ["無制限", "22以上の症状", "全ライブラリ", "オフライン", "HD", "広告なし", "タイマー", "進捗"],
    tier_divine: ["Pro全機能", "AI診断", "個別プログラム", "ライブ音浴", "1対1", "ファミリー", "優先サポート"],
    priceM: "¥499", priceY: "¥3,999", divM: "¥1,299", divY: "¥9,999", freeP: "¥0"
  }
};

const UI_LABELS_EN = {
  todayRemedy: "Today's Remedy",
  startRemedy: "Start Remedy",
  sanctuaryHeader: "Select Healing Sanctuary",
  programs: "Programs",
  subCatsAvailable: "Sub-Categories Available",
  backToSanctuaries: "Back to sanctuaries",
  selectTargetProgram: "Select Target Program",
  stopPreview: "Stop Preview",
  nowPlayingPrefix: "Now Playing:",
  quickSymptomScan: "Quick Symptom Scan",
  therapistDialogue: "Therapist Dialogue",
  recommendedSanctuaries: "RECOMMENDED SANCTUARIES",
  startBtn: "Start",
  describeSymptomPlaceholder: "Describe your pain, stress, or goals...",
  scanningFrequencies: "Scanning Neural Frequencies...",
  previewPrefix: "Preview:",
  proGateFeatures: [
    "Real binaural beats — 9 Solfeggio frequencies",
    "Unlimited sessions for all 22+ conditions",
    "Individual frequency play in every session",
    "HD lossless audio sound output"
  ]
};

const UI_LABELS_HI = {
  todayRemedy: "आज का उपचार",
  startRemedy: "उपचार शुरू करें",
  sanctuaryHeader: "चिकित्सा अभयारण्य चुनें",
  programs: "प्रोग्राम",
  subCatsAvailable: "उप-श्रेणियाँ उपलब्ध",
  backToSanctuaries: "अभयारण्यों पर वापस जाएं",
  selectTargetProgram: "लक्षित प्रोग्राम चुनें",
  stopPreview: "प्रिव्यू रोकें",
  nowPlayingPrefix: "अभी चल रहा है:",
  quickSymptomScan: "त्वरित लक्षण स्कैन",
  therapistDialogue: "थेरेपिस्ट संवाद",
  recommendedSanctuaries: "अनुशंसित चिकित्सा अभयारण्य",
  startBtn: "शुरू करें",
  describeSymptomPlaceholder: "अपने दर्द, तनाव या लक्ष्यों के बारे में बताएं...",
  scanningFrequencies: "न्यूरल आवृत्तियों को स्कैन किया जा रहा है...",
  previewPrefix: "प्रिव्यू:",
  proGateFeatures: [
    "वास्तविक बाइनॉरल बीट्स - 9 सोल्फेगियो आवृत्तियाँ",
    "सभी 22+ रोगों के लिए असीमित सत्र",
    "प्रत्येक सत्र में व्यक्तिगत आवृत्ति चलाने की सुविधा",
    "एचडी दोषरहित ऑडियो ध्वनि आउटपुट"
  ]
};

async function translateText(text, targetLang) {
  if (!text) return "";
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const json = await res.json();
    const translatedText = json[0].map(item => item[0]).join('');
    return translatedText;
  } catch (e) {
    console.error(`Error translating to ${targetLang}:`, e.message);
    return text;
  }
}

// Delimited translations helper to batch requests and prevent rate-limiting
async function translateBatch(parts, targetLang) {
  const separator = " ::: ";
  const combined = parts.join(separator);
  const translated = await translateText(combined, targetLang);
  
  // Use regex split to tolerate any spacing changes added by translators
  const split = translated.split(/\s*:::\s*/);
  
  // If lengths don't match, translate individually to be safe
  if (split.length !== parts.length) {
    console.log(`⚠️ Batch split mismatch for ${targetLang}. Falling back to individual translation.`);
    const individual = [];
    for (const p of parts) {
      individual.push(await translateText(p, targetLang));
      await new Promise(r => setTimeout(r, 150));
    }
    return individual;
  }
  
  return split.map(s => s.trim());
}

async function run() {
  console.log("Starting full 6-language translation...");

  // 1. Fetch current database conditions
  const { data: dbConditions, error: fetchError } = await supabase
    .from('conditions')
    .select('*');

  if (fetchError) {
    console.error("Failed to load conditions:", fetchError);
    return;
  }
  console.log(`Fetched ${dbConditions.length} conditions from Supabase.`);

  const translatedConditions = [];

  // Translate all conditions
  for (let idx = 0; idx < dbConditions.length; idx++) {
    const cond = dbConditions[idx];
    console.log(`[${idx + 1}/${dbConditions.length}] Translating: ${cond.title} (${cond.id})...`);

    // Only translate conditions, skip metadata category rows
    if (cond.id.startsWith("category_meta:")) {
      translatedConditions.push(cond);
      continue;
    }

    const translations = cond.translations || {};

    for (const lang of TARGET_LANGS) {
      if (translations[lang] && translations[lang].title && lang !== 'hi') {
        // Skip for already translated (except we re-run hi to ensure fully complete)
        console.log(`  -> ${lang} already exists, skipping.`);
        continue;
      }

      console.log(`  -> Translating to: ${lang}...`);

      // Prepare batch parts
      const parts = [
        cond.title || "",
        cond.sub || "",
        cond.instruments || "",
        cond.protocol || "",
        cond.tip || "",
        cond.science || ""
      ];

      // Add frequency labels and effects
      cond.freqs.forEach(f => {
        parts.push(f.label || "");
        parts.push(f.effect || "");
      });

      // Translate batch
      const translatedParts = await translateBatch(parts, lang);
      await new Promise(r => setTimeout(r, 200)); // rate limiting delay

      const langTrans = {
        title: translatedParts[0],
        sub: translatedParts[1],
        instruments: translatedParts[2],
        protocol: translatedParts[3],
        tip: translatedParts[4],
        science: translatedParts[5],
        freqs: cond.freqs.map((f, fIdx) => {
          return {
            hz: f.hz,
            role: f.role,
            label: translatedParts[6 + fIdx * 2],
            effect: translatedParts[6 + fIdx * 2 + 1],
            duration: f.duration
          };
        })
      };

      translations[lang] = langTrans;
    }

    // Save back to DB
    const { error: updateError } = await supabase
      .from('conditions')
      .update({ translations })
      .eq('id', cond.id);

    if (updateError) {
      console.error(`❌ Failed to save translations for ${cond.id}:`, updateError.message);
    } else {
      console.log(`✅ Saved translations to DB for ${cond.id}`);
    }

    translatedConditions.push({
      ...cond,
      translations
    });
  }

  // 2. Local Fallback Lists Translations
  console.log("Translating Solfeggio, Brainwaves, and UI labels...");
  
  const localSolfeggios = [
    {hz:174,note:"F",name:"Foundation",action:"Pain relief & anesthesia",     color:"#6366f1"},
    {hz:285,note:"D",name:"Quantum",   action:"Tissue & cellular regeneration",color:"#8b5cf6"},
    {hz:396,note:"G",name:"Liberation",action:"Fear & guilt release",          color:"#a855f7"},
    {hz:417,note:"A",name:"Change",    action:"Trauma & pattern clearing",     color:"#ec4899"},
    {hz:528,note:"C",name:"Love / DNA",action:"Cellular repair & love",        color:"#f59e0b"},
    {hz:639,note:"A",name:"Connection",action:"Interpersonal harmony",         color:"#10b981"},
    {hz:741,note:"G",name:"Expression",action:"Toxin clearing & throat",       color:"#06b6d4"},
    {hz:852,note:"A",name:"Intuition", action:"Third eye & intuition",         color:"#3b82f6"},
    {hz:963,note:"B",name:"Unity",     action:"Pineal activation & oneness",   color:"#7c3aed"}
  ];

  const localBrainwaves = [
    {name:"Delta",range:"0.5–4 Hz",  state:"Deep sleep · Healing",        color:"#6366f1",shape:[0.2,0.8,0.2,0.9,0.1,0.7,0.3,0.8]},
    {name:"Theta",range:"4–8 Hz",   state:"Meditation · Creativity · REM",color:"#8b5cf6",shape:[0.4,0.9,0.2,0.8,0.5,0.9,0.3,0.7]},
    {name:"Alpha",range:"8–13 Hz",  state:"Calm · Flow · Learning",       color:"#10b981",shape:[0.5,0.8,0.5,0.8,0.5,0.8,0.5,0.8]},
    {name:"Beta", range:"13–30 Hz", state:"Alert · Focus · Active",       color:"#f59e0b",shape:[0.6,0.4,0.7,0.3,0.6,0.4,0.7,0.3]},
    {name:"Gamma",range:"30–100 Hz",state:"Peak cognition · Insight",     color:"#ef4444",shape:[0.5,0.9,0.1,0.9,0.5,0.9,0.1,0.9]}
  ];

  // Translate Solfeggios
  for (const sol of localSolfeggios) {
    sol.translations = {};
    for (const lang of TARGET_LANGS) {
      const parts = [sol.name, sol.action];
      const translated = await translateBatch(parts, lang);
      sol.translations[lang] = {
        name: translated[0],
        action: translated[1]
      };
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(`Translated Solfeggio: ${sol.hz}Hz`);
  }

  // Translate Brainwaves
  for (const bw of localBrainwaves) {
    bw.translations = {};
    for (const lang of TARGET_LANGS) {
      const stateTrans = await translateText(bw.state, lang);
      bw.translations[lang] = {
        state: stateTrans
      };
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(`Translated Brainwave: ${bw.name}`);
  }

  // Generate All UI Labels
  const uiTranslations = {
    en: { ...UI_LABELS_EN },
    hi: { ...UI_LABELS_HI }
  };

  // Populate remaining target language UI labels
  for (const lang of TARGET_LANGS) {
    if (lang === 'hi') continue; // hi is already defined
    console.log(`Translating UI labels to: ${lang}...`);
    uiTranslations[lang] = {};
    
    // Translate normal labels
    for (const key of Object.keys(UI_LABELS_EN)) {
      if (key === 'proGateFeatures') {
        const listTrans = [];
        for (const item of UI_LABELS_EN.proGateFeatures) {
          listTrans.push(await translateText(item, lang));
          await new Promise(r => setTimeout(r, 100));
        }
        uiTranslations[lang].proGateFeatures = listTrans;
      } else {
        uiTranslations[lang][key] = await translateText(UI_LABELS_EN[key], lang);
        await new Promise(r => setTimeout(r, 100));
      }
    }
  }

  // 3. Write constants.js with fully localized arrays
  console.log("Writing generated constants.js fallback file...");
  
  const finalLangsObj = {};

  for (const langCode of ['en', 'hi', 'es', 'fr', 'ar', 'ja']) {
    const currentMeta = BASE_LANGS[langCode] || {};
    const newUI = uiTranslations[langCode] || {};
    
    finalLangsObj[langCode] = {
      ...currentMeta,
      ...newUI
    };
  }

  // Build the code string
  const outputCode = `/* ═══════════════════════════════════════════════════════════
   CONDITIONS DATABASE
   Contains wellness targets, frequency pairings, tips, and science
═══════════════════════════════════════════════════════════ */
export const CONDITIONS = ${JSON.stringify(translatedConditions, null, 2)};

/* ═══════════════════════════════════════════════════════════
   SOLFEGGIO FREQUENCIES MAP
═══════════════════════════════════════════════════════════ */
export const SOLFEGGIO = ${JSON.stringify(localSolfeggios, null, 2)};

/* ═══════════════════════════════════════════════════════════
   BRAINWAVE RANGES
═══════════════════════════════════════════════════════════ */
export const BRAINWAVES = ${JSON.stringify(localBrainwaves, null, 2)};

/* ═══════════════════════════════════════════════════════════
   UTILITY CONSTANTS
═══════════════════════════════════════════════════════════ */
export const FREE_IDS = new Set(["anxiety","depression","sleep","grief","selfesteem"]);
export const CATS = ["All","Mental","Physical","Chronic","Endocrine","Emotional","Cardiovascular Disease"];

/* ═══════════════════════════════════════════════════════════
   LANGUAGE STRINGS (TRANSLATIONS MATRIX)
═══════════════════════════════════════════════════════════ */
export const LANGS = ${JSON.stringify(finalLangsObj, null, 2)};
`;

  const constantsPath = path.join(__dirname, '..', 'constants.js');
  fs.writeFileSync(constantsPath, outputCode, 'utf8');
  console.log(`Successfully wrote constants to ${constantsPath}`);

  // Delete temp file fetch_one.js
  try {
    fs.unlinkSync(path.join(__dirname, 'fetch_one.js'));
  } catch (_) {}

  console.log("6-Language translation pipeline execution completed!");
}

run().catch(console.error);
