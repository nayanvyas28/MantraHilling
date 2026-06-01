const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (stat.isFile() && (file.endsWith('.log') || file.endsWith('.txt'))) {
      if (fullPath.includes('log') || fullPath.includes('output') || fullPath.includes('error')) {
        console.log(`LOG FILE FOUND: ${fullPath}`);
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.trim()) {
            console.log('--- CONTENT START ---');
            console.log(content.split('\n').slice(-50).join('\n')); // last 50 lines
            console.log('--- CONTENT END ---');
          }
        } catch (e) {
          console.log(`Failed to read: ${e.message}`);
        }
      }
    }
  }
}

console.log('Searching for CMake/Prefab logs...');
searchDir('E:/mantrapuja/MantraHilling/android/app/build/intermediates/cxx');
console.log('Done searching.');
