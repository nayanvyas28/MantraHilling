const https = require('https');
const env = require('../load_env');
const SUPABASE_URL = env.SUPABASE_URL || 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

function run() {
  const url = `${SUPABASE_URL}/rest/v1/`;
  const options = {
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
    }
  };

  https.get(url, options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const data = JSON.parse(rawData);
        console.log("Paths in OpenAPI spec:");
        const paths = Object.keys(data.paths || {});
        paths.forEach(p => {
          if (p.includes('/rpc/')) {
            console.log(`- RPC Path: ${p}`);
          } else {
            console.log(`- Path: ${p}`);
          }
        });
      } catch (e) {
        console.error("JSON Parse Error:", e.message);
      }
    });
  }).on('error', (e) => {
    console.error("HTTP GET Error:", e.message);
  });
}

run();
