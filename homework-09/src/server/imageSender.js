const fs = require('fs');
const { pipeline } = require('stream');
const { TransmissionRateSlowdown } = require('../utils/utils');

const config = require('../config');

function sendJPEG(res) {
  pipeline(
    fs.createReadStream(config.filePath),
    new TransmissionRateSlowdown(config.speedByte),
    res,
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err.message);
      } else {
        console.log('Pipeline succeeded.');
      }
    },
  );
}

module.exports = {
  sendJPEG,
};
