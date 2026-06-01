const { createClient } = require('@supabase/supabase-js');
const env = require('../load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

class DummyWebSocket {}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: DummyWebSocket }
});

async function run() {
  console.log("Checking if 'policies' table exists...");
  const { data, error } = await supabase.from('policies').select('*').limit(1);
  if (error) {
    console.log("Error querying policies:", error.message, error.code);
  } else {
    console.log("Policies table exists! Data:", data);
  }
}

run();
