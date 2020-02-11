const http = require('http');
const querystring = require('querystring');
const DB = require('./workDB');
require('dotenv').config();

function startServer() {
  const server = http.createServer((req, res) => {
    let result = {};
    let object;
    let body = '';
    req
      .on('data', (chunk) => {
        body += chunk;
      })
      .on('end', async () => {
        try {
          const { method } = req;
          object = JSON.parse(JSON.stringify(querystring.parse(body)));
          result = await DB(method, object);

          if (
            result === 'error Create User' ||
            result === 'update User error' ||
            result === 'delete User error'
          ) {
            throw new Error(result);
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: err.message }));
        }
      });
  });
  server.listen(Number(process.env.SERVER_PORT), () => {
    console.log(`server up PORT: ${process.env.SERVER_PORT}`);
  });
}

module.exports = startServer;
