const { createClient } = require('@supabase/supabase-js');
const env = require('../load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

class DummyWebSocket {}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: DummyWebSocket }
});

async function check() {
  const { data, error } = await supabase.from('brainwaves').select('*');
  if (error) {
    console.error("❌ Brainwaves table query failed:", error.message);
  } else {
    console.log("✅ Brainwaves table exists! Count:", data.length);
    console.log("Data:", data);
  }
}

check();
