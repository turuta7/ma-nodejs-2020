// const fsp = require('fs').promises;
const fs = require('fs');
const config = require('../config');

let speed = config.speedMb || 0.125;
if (speed < 0.125) speed = 0.125;

let i = 0;
function sendJPEG(res) {
  const stream = fs.createReadStream(config.filePath);
  const run = setInterval(() => {
    process.stdout.write('.');
    i = 0;
    stream.resume();
  }, 1000);
  stream
    .on('data', (chunk) => {
      i += chunk.length / 1024 / 1024;
      if (i >= speed) {
        stream.pause();
      }
      res.write(chunk);
    })
    .on('close', () => {
      clearInterval(run);
      console.log('ok');
      res.end();
    })
    .on('error', (error) => {
      console.error('Failed  buffer!', error);
      res.emit('error', new Error('Failed image!'));
    });
}

module.exports = {
  sendJPEG,
};
