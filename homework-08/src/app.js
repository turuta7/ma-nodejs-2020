const readline = require('readline-sync');
const AxiosRequest = require('../request/axios');
const RequestNative = require('../request/requestNative');
const HttpRequest = require('../request/httpRequest');

const limit = 233;
const timer = 5000;

// endpoint axios
const Axios = new AxiosRequest();
const endpointNum1 = 'http://localhost:4000/limit';
const endpointNum2 = 'http://localhost:4000/metrics?filter=allocated';
const endpointNum3 = 'http://localhost:4000/metrics?filter=total';
const endpointNum4 = 'http://localhost:4000/metrics?filter=free';
const endpointNum5 = 'http://localhost:4000/metrics';
// endpoint RequestNative
const Request = new RequestNative();
const endpointNumRequest1 = 'http://localhost:4000/limit';
const endpointNumRequest2 = 'http://localhost:4000/metrics?filter=allocated';
const endpointNumRequest3 = 'http://localhost:4000/metrics?filter=total';
const endpointNumRequest4 = 'http://localhost:4000/metrics?filter=free';
const endpointNumRequest5 = 'http://localhost:4000/metrics';
// endpoint httpRequest
const Http = new HttpRequest();
const endpointNumHttpRequest1 = 'http://localhost:4000/limit';
const endpointNumHttpRequest2 = 'http://localhost:4000/metrics?filter=allocated';
const endpointNumHttpRequest3 = 'http://localhost:4000/metrics?filter=total';
const endpointNumHttpRequest4 = 'http://localhost:4000/metrics?filter=free';
const endpointNumHttpRequest5 = 'http://localhost:4000/metrics';

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
      Axios.response(endpointNum1, 'post', limit)
        .then((x) => {
          console.log(`endpointNum1: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Axios.response(endpointNum2)
        .then((x) => {
          console.log(`endpointNum2: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Axios.response(endpointNum3)
        .then((x) => {
          console.log(`endpointNum3: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Axios.response(endpointNum4)
        .then((x) => {
          console.log(`endpointNum4: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Axios.response(endpointNum5)
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
      Request.response(endpointNumRequest1, 'post', limit)
        .then((x) => {
          console.log(`endpointNumRequest1: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Request.response(endpointNumRequest2)
        .then((x) => {
          console.log(`endpointNumRequest2: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Request.response(endpointNumRequest3)
        .then((x) => {
          console.log(`endpointNumRequest3: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Request.response(endpointNumRequest4)
        .then((x) => {
          console.log(`endpointNumRequest4: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Request.response(endpointNumRequest5)
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
      Http.response(endpointNumHttpRequest1, 'POST', limit)
        .then((x) => {
          console.log(`endpointNumHttpRequest1: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });

      Http.response(endpointNumHttpRequest2)
        .then((x) => {
          console.log(`endpointNumHttpRequest2: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Http.response(endpointNumHttpRequest3)
        .then((x) => {
          console.log(`endpointNumHttpRequest3: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Http.response(endpointNumHttpRequest4)
        .then((x) => {
          console.log(`endpointNumHttpRequest4: `);
          console.log(x);
        })
        .catch((e) => {
          console.log(e);
        });
      Http.response(endpointNumHttpRequest5)
        .then((x) => {
          console.log(`endpointNumHttpRequest5: `);
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
