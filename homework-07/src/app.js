/* eslint-disable guard-for-in */
const http = require('http');
const querystring = require('querystring');
const os = require('os');
const url = require('url');
const auth = require('./auth');

const PORT = process.env.PORT || 3000;

const totalMem = Number((os.totalmem() / 1024 / 1024).toFixed());
const freeMem = Number((os.freemem() / 1024 / 1024).toFixed(3));
const busyMem = totalMem - freeMem;

//  value storage in variable
let limitNum;

http
  .createServer((req, res) => {
    switch (req.url && req.url.split('?')[0]) {
      // check url limit
      case '/limit':
        if (req.method === 'POST') {
          // authorization user
          if (!auth(req.headers.authorization)) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 401;
            res.write(
              JSON.stringify({
                message: 'Unauthorized',
              }),
            );
            res.end();
            break;
          }
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            const decodedBody = querystring.parse(body);
            const fullBody = JSON.parse(JSON.stringify(decodedBody));

            // eslint-disable-next-line guard-for-in
            // eslint-disable-next-line no-restricted-syntax
            for (const i in fullBody) {
              // check body key: limit
              // eslint-disable-next-line default-case
              switch (i) {
                case 'limit':
                  limitNum = fullBody[i];
                  break;
              }
            }
            const numResult = +limitNum;
            // number check value
            if (!numResult && !Number.isNaN(numResult) === false) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.write(
                JSON.stringify({
                  message: 'New value for minimum free memory limit is not valid number',
                }),
              );
              res.end();
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              const message = `Minimum free memory limit is successfully set to ${numResult} MB`;
              res.write(
                JSON.stringify({
                  message,
                }),
              );
              res.end();
            }
          });
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.write(
            JSON.stringify({
              message: 'Internal error occurred',
            }),
          );
          res.end();
        }
        break;
      // -----------------------------------------------------------------------
      //  check url metrics
      case '/metrics':
        if (req.method === 'GET') {
          // authorization user
          if (!auth(req.headers.authorization)) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 401;
            res.write(
              JSON.stringify({
                message: 'Unauthorized',
              }),
            );
            res.end();
            break;
          } else if (req.url.split('?')[1] !== undefined) {
            const query = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
            console.log(query);
            // eslint-disable-next-line guard-for-in
            // eslint-disable-next-line no-restricted-syntax
            for (const i in query) {
              // eslint-disable-next-line default-case
              switch (i) {
                case 'filter':
                  if (query[i] === 'total') {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    res.write(
                      JSON.stringify({
                        message: 'OK',
                        total: totalMem,
                      }),
                    );
                    res.end();
                  }
                  if (query[i] === 'free') {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    res.write(
                      JSON.stringify({
                        message: 'OK',
                        free: freeMem,
                      }),
                    );
                    res.end();
                  }
                  if (query[i] === 'allocated') {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 400;
                    res.write(
                      JSON.stringify({
                        message: 'OK',
                        allocated: busyMem,
                      }),
                    );
                    res.end();
                  }
              }
            }
            res.end();
            break;
          } else {
            // if the free memory is less than the limit, reassign the message
            let message = 'OK';
            if (freeMem < Number(limitNum)) message = 'Available memory is under the defined limit';
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.write(
              JSON.stringify({
                message,
                total: totalMem,
                free: freeMem,
                allocated: busyMem,
              }),
            );
            res.end();
          }
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.write(
            JSON.stringify({
              message: 'Internal error occurred',
            }),
          );
          res.end();
        }
        break;
      default:
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.write(
          JSON.stringify({
            message: 'Internal error occurred',
          }),
        );
        res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`up server port ${PORT}`);
  });
