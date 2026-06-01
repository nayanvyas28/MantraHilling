const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPaths = [
    path.join(__dirname, 'web-admin', '.env.local'),
    path.join(__dirname, '.env.local'),
    path.join(__dirname, '..', 'web-admin', '.env.local'),
    path.join(__dirname, '..', '.env.local'),
  ];
  
  let SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  let SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  for (const envPath of envPaths) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const parts = trimmed.split('=');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
            if (key === 'NEXT_PUBLIC_SUPABASE_URL' || key === 'SUPABASE_URL') {
              if (!SUPABASE_URL) SUPABASE_URL = val;
            }
            if (key === 'SUPABASE_SERVICE_ROLE_KEY' || key === 'SUPABASE_SERVICE_KEY') {
              if (!SUPABASE_SERVICE_KEY) SUPABASE_SERVICE_KEY = val;
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }
  
  return {
    SUPABASE_URL: SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co',
    SUPABASE_SERVICE_KEY: SUPABASE_SERVICE_KEY
  };
}

module.exports = loadEnv();
