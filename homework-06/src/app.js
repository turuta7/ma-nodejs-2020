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
      switch (
        process.argv[i]
          .split('--')[1]
          .split('=')[0]
          .toLocaleUpperCase()
      ) {
        case 'RATE':
          if (Number(process.argv[i].split('--')[1].split('=')[1]) > 0) {
            RATE = Number(process.argv[i].split('--')[1].split('=')[1]);
          }
          break;
        case 'LIMIT':
          if (Number(process.argv[i].split('--')[1].split('=')[1]) > 0) {
            LIMIT = Number(process.argv[i].split('--')[1].split('=')[1]);
          }
          break;
        case 'COLOR':
          if (process.argv[i].split('--')[1].split('=')[1] === 'true') {
            COLOR = true;
          } else if (process.argv[i].split('--')[1].split('=')[1] === 'false') COLOR = false;
          break;

        default:
          break;
      }
    }
  }
}

let delta = 0;
const text = `!!! ATTENTION: Available memory is under the defined limit !!!`;

// cleaning the console and displaying information from memory
setInterval(() => {
  console.clear();
  const totalMem = (os.totalmem() / 1024000).toFixed();
  const freeMem = (os.freemem() / 1024000).toFixed(3);
  const busyMem = totalMem - freeMem;
  const resultDelta = delta - busyMem;

  util.inspect.styles.string = 'red';
  if (resultDelta <= 0) {
    util.inspect.styles.number = 'red';
  } else {
    util.inspect.styles.number = 'green';
  }
  const colorDeltaMem = util.inspect(Number(resultDelta.toFixed(3)), {
    colors: COLOR,
  });

  console.log(`Total system memory: ${totalMem} MB `);
  if (freeMem < LIMIT) {
    util.inspect.styles.number = 'red';
    const sss = util.inspect(Number(freeMem), {
      colors: COLOR,
    });

    console.log(`Free memory available:${sss} MB`);
    util.inspect.styles.number = 'white';
  } else {
    console.log(`Free memory available: ${freeMem} MB`);
  }

  console.log(`Allocated memory ${busyMem} MB`);
  console.log(`Delta for previous allocated memory value: ${colorDeltaMem} MB`);
  if (LIMIT > freeMem) {
    console.log(
      util.inspect(text, {
        colors: COLOR,
      }),
    );
  }
  delta = busyMem;
}, RATE);
