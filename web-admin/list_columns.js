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
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);

  if (error) {
    console.error("Error fetching record:", error);
    return;
  }

  if (data && data.length > 0) {
    console.log("=== Existing Columns in 'profiles' table ===");
    console.log(Object.keys(data[0]));
  } else {
    console.log("No records found in profiles table.");
  }
}

run();
