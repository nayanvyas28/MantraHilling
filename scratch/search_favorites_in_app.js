const fs = require('fs');
const path = require('path');

function run() {
  const filePath = path.join(__dirname, '..', 'App.js');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log("Lines in App.js containing 'favorite':");
  lines.forEach((line, index) => {
    if (line.toLowerCase().includes('favorite')) {
      console.log(`L${index + 1}: ${line.trim()}`);
    }
  });
}

run();
