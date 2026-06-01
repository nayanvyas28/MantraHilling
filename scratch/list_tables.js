const { createClient } = require('@supabase/supabase-js');
const env = require('../load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
});

async function run() {
  // Let's run a query to get tables or run a test select on common tables
  const tables = ['settings', 'app_settings', 'policies', 'legal', 'sections', 'conditions', 'solfeggio', 'profiles'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`Table '${table}': NOT FOUND or ERROR:`, error.message);
    } else {
      console.log(`Table '${table}': EXISTS!`);
    }
  }
}
run();
