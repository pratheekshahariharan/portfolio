const cp = require('child_process');
console.log('Installing pdf-parse...');
cp.execSync('npm install pdf-parse', { stdio: 'inherit' });
console.log('Reading PDF...');
require('./read_pdf.js');
console.log('Done reading PDF. Check pdf_output.txt');
