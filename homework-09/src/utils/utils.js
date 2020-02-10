const { Transform } = require('stream');

class TransmissionRateSlowdown extends Transform {
  constructor(speed) {
    super();
    this.speed = speed;
    this.counter = 0;
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(chunk, enc, next) {
    const timer = (1000 / this.speed) * chunk.length;
    this.counter += chunk.length / 1000 / 1000;
    if (this.counter >= 1) {
      process.stdout.write('.');
      this.counter = 0;
    }
    setTimeout(() => {
      this.push(chunk);
      next();
    }, timer);
  }
}

module.exports = { TransmissionRateSlowdown };
