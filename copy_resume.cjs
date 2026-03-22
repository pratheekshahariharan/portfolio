const fs = require('fs');
fs.mkdirSync('p:/portfolio/public', { recursive: true });
fs.copyFileSync('p:/Intern/PRATHEEKSHA_H_RESUME.pdf', 'p:/portfolio/public/PRATHEEKSHA_H_RESUME.pdf');
console.log('Successfully copied PRATHEEKSHA_H_RESUME.pdf to public folder.');
