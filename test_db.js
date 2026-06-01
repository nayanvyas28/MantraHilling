const { createClient } = require('@supabase/supabase-js');
const env = require('./load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

class DummyWebSocket {}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: DummyWebSocket }
});

async function check() {
  console.log("----------------------------------------");
  console.log("Checking all rows in conditions table...");
  const { data: condData, error: condError } = await supabase
    .from('conditions')
    .select('id, title');
  if (condError) {
    console.error("❌ Conditions query error:", condError.message);
  } else {
    console.log(`✅ Total Conditions count: ${condData ? condData.length : 0}`);
    if (condData) {
      condData.forEach(row => {
        console.log(`- ID: "${row.id}", Title: "${row.title}"`);
      });
    }
  }

  console.log("Checking solfeggio table...");
  const { data: solData, error: solError } = await supabase.from('solfeggio').select('hz, name');
  if (solError) {
    console.error("❌ Solfeggio query error:", solError.message);
  } else {
    console.log(`✅ Solfeggio count: ${solData ? solData.length : 0}`);
  }

  console.log("Checking profiles table...");
  const { data: profData, error: profError } = await supabase.from('profiles').select('*').limit(1);
  if (profError) {
    console.error("❌ Profiles table error/does not exist:", profError.message);
  } else {
    console.log("✅ Profiles table exists and is readable! Sample:", profData);
  }
  console.log("----------------------------------------");
}

check();
