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
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("Error listing auth users:", error);
  } else {
    console.log("Auth users:");
    data.users.forEach(u => {
      console.log(`- Email: ${u.email}, ID: ${u.id}, Metadata:`, u.user_metadata);
    });
  }
}

run();
