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
  const { data: conds } = await supabase.from('conditions').select('id, title, audio_url');
  console.log("Conditions:");
  conds.forEach(c => {
    console.log(`- ${c.id}: ${c.audio_url || 'NULL'}`);
  });

  const { data: solfs } = await supabase.from('solfeggio').select('hz, name, audio_url');
  console.log("Solfeggio:");
  solfs.forEach(s => {
    console.log(`- ${s.hz}Hz (${s.name}): ${s.audio_url || 'NULL'}`);
  });
}

check();
