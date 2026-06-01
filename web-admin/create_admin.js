const { createClient } = require('@supabase/supabase-js');

const env = require('../load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_KEY;

// Using fetch to avoid Node 20 WebSocket issues
async function createAdminUser(email, password) {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
        email_confirm: true, // Auto-confirm email to bypass verification
        user_metadata: { role: 'admin' }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    console.log('✅ Admin user created successfully!');
    console.log(`ID: ${data.id}`);
    console.log(`Email: ${data.email}`);
  } catch (err) {
    console.error('❌ Error creating admin user:', err.message);
  }
}

// Get arguments from command line
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node create_admin.js <email> <password>');
  process.exit(1);
}

createAdminUser(args[0], args[1]);
