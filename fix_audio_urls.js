const { createClient } = require('@supabase/supabase-js');
const env = require('./load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

class DummyWebSocket {}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: DummyWebSocket }
});

const R2_BASE = 'https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music';

// These are the actual files in R2 — properly URL-encoded
const PHASE_FILES = {
  phase1: `${R2_BASE}/${encodeURIComponent('Phase 1 — Respiratory Entrainment (0–8 min).wav')}`,
  phase2: `${R2_BASE}/${encodeURIComponent('Phase 2 — 528 Hz Anti-Inflammatory Core (8–22 min).wav')}`,
  phase3: `${R2_BASE}/${encodeURIComponent('Phase 3 — Cardiac Coherence Close.wav')}`,
};

async function fixHeartDaily() {
  console.log("=== Fixing heart-daily audio URLs ===\n");

  // 1. Fetch current heart-daily condition
  const { data: cond, error } = await supabase
    .from('conditions')
    .select('*')
    .eq('id', 'heart-daily')
    .single();

  if (error) {
    console.error("❌ Failed to fetch heart-daily:", error.message);
    return;
  }

  console.log("Current audio_url:", cond.audio_url);
  console.log("Current freqs:", JSON.stringify(cond.freqs, null, 2));

  // 2. Update freqs with per-phase audio_url
  const updatedFreqs = cond.freqs.map((f, idx) => {
    const audioUrl = idx === 0 ? PHASE_FILES.phase1
                   : idx === 1 ? PHASE_FILES.phase2
                   : PHASE_FILES.phase3;
    return { ...f, audio_url: audioUrl };
  });

  // 3. Set condition-level audio_url to Phase 1 (plays first)
  const { error: updateError } = await supabase
    .from('conditions')
    .update({
      audio_url: PHASE_FILES.phase1,
      freqs: updatedFreqs
    })
    .eq('id', 'heart-daily');

  if (updateError) {
    console.error("❌ Update failed:", updateError.message);
    return;
  }

  console.log("\n✅ heart-daily updated successfully!");
  console.log("  audio_url →", PHASE_FILES.phase1);
  console.log("  Phase 1 audio →", PHASE_FILES.phase1);
  console.log("  Phase 2 audio →", PHASE_FILES.phase2);
  console.log("  Phase 3 audio →", PHASE_FILES.phase3);

  // 4. Also update the other heart conditions to use Phase 1 audio as default
  const otherHeartIds = ['heart-hyper-morning', 'heart-hyper-evening', 'heart-recovery-1', 'heart-recovery-2'];
  
  for (const id of otherHeartIds) {
    const { error: otherError } = await supabase
      .from('conditions')
      .update({ audio_url: PHASE_FILES.phase1 })
      .eq('id', id);

    if (otherError) {
      console.error(`❌ Failed to update ${id}:`, otherError.message);
    } else {
      console.log(`✅ ${id} → Phase 1 audio linked`);
    }
  }

  // 5. Verify
  console.log("\n=== Verification ===");
  const { data: verifyData } = await supabase
    .from('conditions')
    .select('id, audio_url')
    .like('id', 'heart%');
  
  verifyData.forEach(c => {
    console.log(`  ${c.id}: ${c.audio_url ? '✅' : '❌'} ${c.audio_url || 'NULL'}`);
  });
}

fixHeartDaily();
