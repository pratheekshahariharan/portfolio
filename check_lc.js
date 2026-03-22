const https = require('https');
// Method 1
https.get('https://alfa-leetcode-api.onrender.com/pratheeksha_hariharan/solved', (resp) => {
  let data = '';
  resp.on('data', (c) => data += c);
  resp.on('end', () => console.log("ALFA:", data));
}).on("error", (err) => console.log("Error ALFA: " + err.message));

// Method 2
https.get('https://leetcode-stats-api.herokuapp.com/pratheeksha_hariharan', (resp) => {
  let data = '';
  resp.on('data', (c) => data += c);
  resp.on('end', () => console.log("HEROKU:", data));
}).on("error", (err) => console.log("Error HEROKU: " + err.message));
