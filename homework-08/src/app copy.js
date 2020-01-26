const readline = require('readline-sync');
const Axios = require('../request/axios');

// let choiceOfUrl = 'http://localhost:4000/';
const limit = 400;
const j1 = 5000;
const j2 = 5000;
const j3 = 5000;
const j4 = 5000;
const j5 = 5000;

const endpointNum1 = new Axios('http://localhost:4000/limit', 'post', limit);
const endpointNum2 = new Axios('http://localhost:4000/metrics?filter=allocated', 'get');
const endpointNum3 = new Axios('http://localhost:4000/metrics?filter=total', 'get');
const endpointNum4 = new Axios('http://localhost:4000/metrics?filter=free', 'get');
const endpointNum5 = new Axios('http://localhost:4000/metrics', 'get');

console.log('----------------------');
console.log('Choice Of Request: ');
console.log('1 - Axios\n');

const choiceOfRequest = readline.question('Choice Of Request: ');

if (Number(choiceOfRequest) >= 1 && Number(choiceOfRequest) <= 3) {
  if (choiceOfRequest === '1') {
    setInterval(() => {
      console.clear();

      endpointNum1
        .response()
        .then((x) => {
          console.log(`endpointNum1`, j1);
          console.log(x);
        })
        .catch((e) => {
          console.log('error', e);
          // j1 *= 2;
        });
    }, j1);
    setInterval(() => {
      endpointNum2
        .response()
        .then((x) => {
          console.log(`endpointNum2`, j2);
          console.log(x);
        })
        .catch((e) => {
          console.log('error', e);
          // j2 *= 2;
        });
    }, j2);
    setInterval(() => {
      endpointNum3
        .response()
        .then((x) => {
          console.log(`endpointNum3`, j3);
          console.log(x);
        })
        .catch((e) => {
          console.log('error', e);
          // j3 *= 2;
        });
    }, j3);
    setInterval(() => {
      endpointNum4
        .response()
        .then((x) => {
          console.log(`endpointNum4`, j4);
          console.log(x);
        })
        .catch((e) => {
          console.log('error', e);
          // j4 *= 2;
        });
    }, j4);
    setInterval(() => {
      endpointNum5
        .response()
        .then((x) => {
          console.log(`endpointNum5`, j5);
          console.log(x);
        })
        .catch((e) => {
          console.log('error', e);
          // j5 *= 2;
        });
    }, j5);
    //  }
    // } else console.log('err');
  } else if (choiceOfRequest === '2') {
    console.log('');
  }
}
