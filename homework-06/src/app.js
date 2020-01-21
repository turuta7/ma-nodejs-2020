const os = require('os');

let RATE = process.env.RATE || 1000;
let LIMIT = process.env.LIMIT || 500;
let COLOR = process.env.COLOR || true;

let red = '';
let green = '';

if (COLOR) {
  red = `\x1b[31m`;
  green = '\x1b[32m';
}

// check is process.argv and variable assignment
if (process.argv) {
  // eslint-disable-next-line no-restricted-syntax
  for (const i in process.argv) {
    if (i >= 2) {
      const processArgv = Number(process.argv[i].split('--')[1].split('=')[1]);
      switch (
        process.argv[i]
          .split('--')[1]
          .split('=')[0]
          .toLocaleUpperCase()
      ) {
        case 'RATE':
          if (processArgv > 0) {
            RATE = processArgv;
          }
          break;
        case 'LIMIT':
          if (processArgv > 0) {
            LIMIT = processArgv;
          }
          break;
        case 'COLOR':
          if (processArgv === 'true') {
            COLOR = true;
          } else if (processArgv === 'false') COLOR = false;
          break;

        default:
          break;
      }
    }
  }
}

let delta = 0;
const text = `!!! ATTENTION: Available memory is under the defined limit !!!`;

setInterval(() => {
  console.clear();
  const totalMem = (os.totalmem() / 1024 / 1024).toFixed();
  const freeMem = (os.freemem() / 1024 / 1024).toFixed(3);
  const busyMem = totalMem - freeMem;
  const resultDelta = delta - busyMem;

  console.log(`\x1b[37mTotal system memory: ${totalMem} MB`);

  if (freeMem < LIMIT) {
    console.log(`Free memory available: ${red}${Number(freeMem)} MB\x1b[37m`);
  } else {
    console.log(`Free memory available: ${freeMem} MB`);
  }

  console.log(`Allocated memory ${busyMem} MB`);
  if (resultDelta <= 0) {
    console.log(`Delta for previous allocated memory value: ${red}${resultDelta.toFixed(3)} MB`);
  } else {
    console.log(`Delta for previous allocated memory value: ${green}${resultDelta.toFixed(3)} MB`);
  }
  if (LIMIT > freeMem) {
    console.log(`${red + text}\x1b[37m`);
  }
  delta = busyMem;
}, RATE);
