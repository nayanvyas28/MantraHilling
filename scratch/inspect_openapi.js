const fs = require('fs');
const path = require('path');

function run() {
  const filePath = path.join(__dirname, 'openapi.json');
  if (!fs.existsSync(filePath)) {
    console.error("openapi.json does not exist. The download task might have failed.");
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  console.log("Exposed RPC functions in Supabase:");
  const paths = Object.keys(data.paths || {});
  let found = false;
  paths.forEach(p => {
    if (p.startsWith('/rpc/')) {
      console.log(`- ${p}`);
      found = true;
    }
  });
  if (!found) {
    console.log("No custom RPC functions found in the api schema.");
  }
}

run();
