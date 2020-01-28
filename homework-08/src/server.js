/* eslint-disable guard-for-in */
const http = require('http');
// const querystring = require('querystring');
const os = require('os');
const url = require('url');
// const bodyParser = require('body-parser');
const auth = require('./auth');

const PORT = process.env.PORT || 4000;

let totalMem;
let freeMem;
let busyMem;

function randomError() {
  const random = Math.floor(Math.random() * 3);
  if (random === 1) {
    throw new Error(
      JSON.stringify({
        message: 'Internal error occurred',
      }),
    );
  }
}

// reboot data: totalMem / freeMem / busyMem
function reBootData() {
  totalMem = Number((os.totalmem() / 1024 / 1024).toFixed());
  freeMem = Number((os.freemem() / 1024 / 1024).toFixed(3));
  busyMem = totalMem - freeMem;
}

//  value storage in variable
let limitNum;

http
  .createServer(async (req, res) => {
    function authorization() {
      if (!auth(req.headers.authorization)) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');

        try {
          res.write(
            JSON.stringify({
              message: 'Unauthorized',
            }),
          );
        } catch (error) {
          console.error(`error JSON ${error}`);
        }
        res.end();
        return false;
      }
      return true;
    }

    async function error500() {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      try {
        res.write(
          JSON.stringify({
            message: 'Internal error occurred',
          }),
        );
      } catch (error) {
        console.error(error);
      }
      res.end();
    }

    let checkAuthorization;

    switch (req.url && req.url.split('?')[0]) {
      // check url limit

      case '/limit':
        reBootData();
        try {
          checkAuthorization = await authorization();
        } catch (error) {
          console.error(`error authorization, ${error} `);
        }
        if (req.method === 'POST') {
          // authorization user
          if (checkAuthorization) {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });

            req.on('end', async () => {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              let fullBody;
              try {
                if (body) fullBody = JSON.parse(body);
                else fullBody = { limit: req.headers.limit };
              } catch (error) {
                console.error(`error JSON FULLBODY, ${error}`);
              }
              if (fullBody.limit) {
                limitNum = fullBody.limit;
              }
              const numResult = +limitNum;
              // number check value
              if (!numResult && !Number.isNaN(numResult) === false) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                try {
                  randomError();
                  res.write(
                    JSON.stringify({
                      message: 'New value for minimum free memory limit is not valid number',
                    }),
                  );
                } catch (error) {
                  await error500();
                  console.error(`error JSON, ${error}`);
                }
                res.end();
              } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                const message = `Minimum free memory limit is successfully set to ${numResult} MB`;
                try {
                  randomError();
                  res.write(
                    JSON.stringify({
                      message,
                    }),
                  );
                } catch (error) {
                  await error500();
                  console.error(`error JSON, ${error}`);
                }
                res.end();
              }
            });
          } else {
            await error500();
            res.end();
          }
        } else {
          await error500();
          res.end();
        }
        break;
      // -----------------------------------------------------------------------
      //  check url metrics

      case '/metrics':
        reBootData();
        try {
          checkAuthorization = await authorization();
        } catch (error) {
          console.log(`error authorization, ${error} `);
        }

        if (req.method === 'GET') {
          // authorization user
          if (checkAuthorization) {
            if (req.url.split('?')[1] !== undefined) {
              let query;
              try {
                query = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
              } catch (error) {
                console.error(`error query, ${query}`);
              }
              if (query.filter === 'total') {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;

                try {
                  randomError();
                  res.write(
                    JSON.stringify({
                      message: 'OK',
                      total: totalMem,
                    }),
                  );
                } catch (error) {
                  await error500();
                  console.error(`error JSON, ${error}`);
                }
                res.end();
              } else if (query.filter === 'free') {
                let message = 'OK';
                if (freeMem < Number(limitNum))
                  message = 'Available memory is under the defined limit';
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                try {
                  randomError();
                  res.write(
                    JSON.stringify({
                      message,
                      free: freeMem,
                    }),
                  );
                } catch (error) {
                  await error500();
                  console.error(`error JSON, ${error}`);
                }
                res.end();
              } else if (query.filter === 'allocated') {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                try {
                  randomError();
                  res.write(
                    JSON.stringify({
                      message: 'OK',
                      allocated: busyMem,
                    }),
                  );
                } catch (error) {
                  await error500();
                  console.error(`error JSON, ${error}`);
                }
                res.end();
              } else {
                await error500();
              }
              res.end();
              break;
            } else {
              // if the free memory is less than the limit, reassign the message
              let message = 'OK';
              if (freeMem < Number(limitNum))
                message = 'Available memory is under the defined limit';
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              try {
                randomError();
                res.write(
                  JSON.stringify({
                    message,
                    total: totalMem,
                    free: freeMem,
                    allocated: busyMem,
                  }),
                );
              } catch (error) {
                await error500();
                console.error(`error JSON, ${error}`);
              }
              res.end();
            }
          }
        } else await error500();
        break;

      default:
        try {
          checkAuthorization = await authorization();
        } catch (error) {
          console.log(`error authorization, ${error} `);
        }

        if (checkAuthorization) {
          await error500();
        }
        await authorization();
        break;
    }
  })
  .listen(PORT, () => {
    console.log(`up server port ${PORT}`);
  });
