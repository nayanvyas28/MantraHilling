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
    },
    timeout: 5000 // 5 seconds timeout
  };

  const req = https.get(url, options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const data = JSON.parse(rawData);
        console.log("Exposed RPC paths:");
        const paths = Object.keys(data.paths || {});
        let found = false;
        paths.forEach(p => {
          if (p.includes('/rpc/')) {
            console.log(`- RPC: ${p}`);
            found = true;
          }
        });
        if (!found) console.log("No RPC paths found.");
      } catch (e) {
        console.error("JSON Parse Error:", e.message);
      }
      process.exit(0);
    });
  });

  req.on('error', (e) => {
    console.error("HTTP GET Error:", e.message);
    process.exit(1);
  });

  req.on('timeout', () => {
    console.error("HTTP Request timed out after 5s.");
    req.destroy();
    process.exit(1);
  });
}

run();
