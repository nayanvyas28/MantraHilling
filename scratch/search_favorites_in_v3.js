const fs = require('fs');
const path = require('path');

function run() {
  const filePath = path.join(__dirname, '..', 'MantraHilling_v3.jsx');
  if (!fs.existsSync(filePath)) {
    console.error("v3 file does not exist");
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log("Lines in MantraHilling_v3.jsx containing 'favorite':");
  lines.forEach((line, index) => {
    if (line.toLowerCase().includes('favorite')) {
      console.log(`L${index + 1}: ${line.trim()}`);
    }
  });
}

run();
