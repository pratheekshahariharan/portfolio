const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('p:/portfolio/public/PRATHEEKSHA_H_RESUME.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('pdf_output.txt', data.text);
}).catch(err => {
    console.error(err);
    fs.writeFileSync('pdf_output.txt', 'ERROR: ' + err.message);
});
