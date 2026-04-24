const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src');
const pattern = /(["'])([^"']+?)@([0-9][^"']*)(["'])/g;
let updatedFiles = [];
function recurse(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, name.name);
    if (name.isDirectory()) recurse(filePath);
    else if (['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(name.name))) {
      const text = fs.readFileSync(filePath, 'utf8');
      const newText = text.replace(pattern, '$1$2$4');
      if (newText !== text) {
        fs.writeFileSync(filePath, newText, 'utf8');
        updatedFiles.push(filePath);
      }
    }
  }
}
recurse(root);
console.log('updated', updatedFiles.length, 'files');
updatedFiles.forEach(f => console.log(f));
