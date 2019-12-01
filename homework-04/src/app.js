const { throwDice } = require('./func/function');

let sum = 0;
let result = 0;

// eslint-disable-next-line consistent-return
setTimeout((err) => {
  result = throwDice();
  if (err) {
    return console.error(err);
  }
  if (result === 0) {
    throw new Error('Lost dice');
  }

  console.log(`First throw: ${result}`);
  sum += result;

  // eslint-disable-next-line consistent-return
  setTimeout((err1) => {
    result = throwDice();
    if (err1) {
      return console.error(err1);
    }
    if (result === 0) {
      throw new Error('Lost dice');
    }

    console.log(`Second throw: ${result}`);
    sum += result;
    setTimeout((err2) => {
      if (err2) {
        console.error(err2);
      }
      console.log(sum);
    }, 1000);
  }, 1300);
}, 700);
