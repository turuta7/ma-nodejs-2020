const readline = require('readline-sync');
const Axios = require('../request/axios');
const RequestNative = require('../request/requestNative');
const HttpRequest = require('../request/httpRequest');

const limit = 400;
const timer = 5000;

// endpoint axios
const endpointNum1 = new Axios('http://localhost:4000/limit', 'post', limit);
const endpointNum2 = new Axios('http://localhost:4000/metrics?filter=allocated', 'get');
const endpointNum3 = new Axios('http://localhost:4000/metrics?filter=total', 'get');
const endpointNum4 = new Axios('http://localhost:4000/metrics?filter=free', 'get');
const endpointNum5 = new Axios('http://localhost:4000/metrics', 'get');
// endpoint RequestNative
const endpointNumRequest1 = new RequestNative('http://localhost:4000/limit', 'post', limit);
const endpointNumRequest2 = new RequestNative(
  'http://localhost:4000/metrics?filter=allocated',
  'get',
);
const endpointNumRequest3 = new RequestNative('http://localhost:4000/metrics?filter=total', 'get');
const endpointNumRequest4 = new RequestNative('http://localhost:4000/metrics?filter=free', 'get');
const endpointNumRequest5 = new RequestNative('http://localhost:4000/metrics', 'get');
// endpoint httpRequest
// const endpointNumHttpRequest1 = new HttpRequest('http://localhost:4000/limit', 'post', limit);
const endpointNumHttpRequest2 = new HttpRequest(
  'http://localhost:4000/metrics?filter=allocated',
  'get',
);
// const endpointNumHttpRequest3 = new HttpRequest(
//  'http://localhost:4000/metrics?filter=total',
//  'get',
// );
// const endpointNumHttpRequest4 = new HttpRequest('http://localhost:4000/metrics?filter=free', 'get');
// const endpointNumHttpRequest5 = new HttpRequest('http://localhost:4000/metrics', 'get');
console.log('----------------------');

console.log('Choice Of Request: ');
console.log('1 - Axios');
console.log('2 - RequestNative');
console.log('3 - http\n');

const choiceOfRequest = readline.question('Choice Of Request: ');

switch (choiceOfRequest) {
  case '1':
    setInterval(() => {
      console.clear();
      endpointNum1
        .response()
        .then((x) => {
          console.log(`endpointNum1: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNum2
        .response()
        .then((x) => {
          console.log(`endpointNum2: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNum3
        .response()
        .then((x) => {
          console.log(`endpointNum3: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNum4
        .response()
        .then((x) => {
          console.log(`endpointNum4: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNum5
        .response()
        .then((x) => {
          console.log(`endpointNum5: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
    }, timer);
    break;
  case '2':
    setInterval(() => {
      console.clear();
      endpointNumRequest1
        .response()
        .then((x) => {
          console.log(`endpointNumRequest1: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNumRequest2
        .response()
        .then((x) => {
          console.log(`endpointNumRequest2: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNumRequest3
        .response()
        .then((x) => {
          console.log(`endpointNumRequest3: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNumRequest4
        .response()
        .then((x) => {
          console.log(`endpointNumRequest4: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      endpointNumRequest5
        .response()
        .then((x) => {
          console.log(`endpointNumRequest5: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
    }, timer);
    break;
  case '3':
    setInterval(() => {
      console.clear();
      endpointNumHttpRequest2
        .response()
        .then((x) => {
          console.log(`endpointNumRequest2: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 5000);
    break;
  default:
    console.log('-----------------------');
    console.log('wrong data');
    console.log('-----------------------');

    break;
}
