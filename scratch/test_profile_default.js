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
  const adminUserId = '1cac712c-e098-4572-a032-a838684337a1';
  
  // Clean up any existing profile for this user
  await supabase.from('profiles').delete().eq('id', adminUserId);
  
  console.log("Inserting a profile for adminUserId with only ID and Email...");
  const { data: insertData, error: insertError } = await supabase
    .from('profiles')
    .insert([{ id: adminUserId, email: 'admin@mantrapuja.com' }])
    .select();
    
  if (insertError) {
    console.error("Insert error:", insertError.message);
  } else {
    console.log("Successfully inserted profile! Data is:", JSON.stringify(insertData, null, 2));
  }
}

run();
