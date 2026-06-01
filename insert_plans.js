const { createClient } = require('@supabase/supabase-js');
const env = require('./load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

class DummyWebSocket {}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: DummyWebSocket }
});

const defaultPlans = [
  {
    key: "free",
    label: "Free",
    price: "0 USDT",
    per: "",
    items: [
      "5 sessions / month",
      "5 healing conditions",
      "432 Hz + 528 Hz basics",
      "Standard audio quality",
      "Supported by ads"
    ],
    col: "#00D1FF",
    badge: null,
    cta: "Try Free"
  },
  {
    key: "pro",
    label: "Pro",
    price: "299 USDT",
    priceY: "1999 USDT",
    per: "/mo",
    perY: "/yr",
    items: [
      "Unlimited sessions",
      "26+ custom conditions",
      "Gamma, Solfeggio & Brainwave targets",
      "HD Studio audio quality",
      "Zero annoying ads"
    ],
    col: "#8B5CF6",
    badge: "Most Popular",
    cta: "Upgrade"
  },
  {
    key: "divine",
    label: "Divine",
    price: "499 USDT",
    priceY: "3999 USDT",
    per: "/mo",
    perY: "/yr",
    items: [
      "All Pro access + beta features",
      "Priority custom sound scans",
      "VIP support",
      "Lossless audio quality"
    ],
    col: "#F5B041",
    badge: "Best Value",
    cta: "Get Divine"
  }
];

async function run() {
  console.log("Upserting plans config in conditions table...");
  const { data, error } = await supabase
    .from('conditions')
    .upsert({
      id: "category_meta:plans",
      title: "Membership Plans Configuration",
      cat: "Metadata",
      sub: "Category · Metadata",
      emoji: "💎",
      color: "#8b5cf6",
      science: "Membership tiers editable config",
      freqs: [],
      translations: { plans: defaultPlans }
    })
    .select();

  if (error) {
    console.error("❌ Error upserting plans config:", error.message);
  } else {
    console.log("✅ Plans config successfully upserting! Record:", data);
  }
}

run();
