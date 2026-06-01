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
    .from('conditions')
    .select('*')
    .eq('id', 'category_meta:get_in_touch')
    .single();
  if (error) {
    console.error("Error fetching get_in_touch row:", error);
  } else {
    console.log("get_in_touch row:", JSON.stringify(data, null, 2));
  }
}

run();
