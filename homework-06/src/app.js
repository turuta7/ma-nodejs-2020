const os = require('os');
const util = require('util');

let RATE = process.env.RATE || 1000;
let LIMIT = process.env.LIMIT || 300;
let COLOR = process.env.COLOR || true;

// check is process.argv and variable assignment
if (process.argv) {
  // eslint-disable-next-line no-restricted-syntax
  for (const i in process.argv) {
    if (i >= 2) {
      const result = process.argv[i]
        .split('--')[1]
        .split('=')[0]
        .toLocaleUpperCase();

      if (result === 'RATE') {
        const sum = Number(process.argv[i].split('--')[1].split('=')[1]);
        if (sum > 0) RATE = sum;
      }
      if (result === 'LIMIT') {
        const sum = Number(process.argv[i].split('--')[1].split('=')[1]);
        if (sum > 0) LIMIT = sum;
      }
      if (result === 'COLOR') {
        if (process.argv[i].split('--')[1].split('=')[1] === 'true') {
          COLOR = true;
        } else if (process.argv[i].split('--')[1].split('=')[1] === 'false') COLOR = false;
      }
    }
  }
}
let delta = 0;
const text = `!!! ATTENTION: Available memory is under the defined limit !!!`;

// cleaning the console and displaying information from memory
setInterval(() => {
  console.clear();
  const totalMem = (os.totalmem() / 1000000).toFixed();
  const freeMem = (os.freemem() / 1000000).toFixed(3);
  const busyMem = totalMem - freeMem;
  util.inspect.styles.string = 'red';
  if (LIMIT > freeMem) {
    util.inspect.styles.number = 'red';
  } else {
    util.inspect.styles.number = 'green';
  }
  const colorFreeMem = util.inspect(Number(freeMem), {
    colors: COLOR,
  });
  console.log(`Total system memory: ${totalMem} MB`);
  console.log(`Free memory available: ${colorFreeMem} MB`);
  console.log(`Allocated memory ${busyMem} MB`);
  console.log(`Delta for previous allocated memory value: ${(delta - busyMem).toFixed(3)} MB`);
  if (LIMIT > freeMem) {
    console.log(
      util.inspect(text, {
        colors: COLOR,
      }),
    );
  }
  delta = busyMem;
}, RATE);
