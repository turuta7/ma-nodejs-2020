const http = require('http');

const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;

class HttpRequest {
  // eslint-disable-next-line class-methods-use-this
  resultData(url, met, limit) {
    const myURL = new URL(url);
    let headers;
    if (limit === undefined) {
      headers = { Authorization: AuthStr };
    } else headers = { Authorization: AuthStr, limit };
    //  console.log(myURL);
    // const options = url2.format(myURL, { headers: { Authorization: AuthStr } });
    const options = {
      // url: myURL.href,
      method: met.toString(),
      href: myURL.href,
      origin: myURL.origin,
      protocol: myURL.protocol,
      username: myURL.username,
      path: myURL.pathname.toString(),
      password: myURL.password,
      host: myURL.host,
      hostname: myURL.hostname,
      port: myURL.port,
      pathname: myURL.pathname,
      search: myURL.search,
      hash: myURL.hash,
      body: {
        limit: 100,
      },
      headers,
      json: true,
    };

    if (myURL.href) {
      return new Promise((resolve, request) => {
        let body = '';
        // console.log(options);

        const req = http.request(options, (res) => {
          // console.log(`statusCode: ${res.statusCode}`)

          res.setEncoding('utf8');

          res.on('data', (data) => {
            body += data;
          });

          res.on('end', () => {
            try {
              if (body) resolve(JSON.parse(body));
            } catch (error) {
              console.log(error);
            }
          });
        });

        req.on('error', (error) => {
          // eslint-disable-next-line prefer-promise-reject-errors
          request({ message: 'Internal error occurred' });
          console.log(error);
        });

        req.end();
      });
    }
    return false;
  }

  async response(url, met = 'get', limit = undefined) {
    try {
      const res = await this.resultData(url, met, limit);
      return res;
    } catch (error) {
      return error;
    }
  }
}

module.exports = HttpRequest;
