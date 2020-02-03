const http = require('http');
const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;

class HttpRequest {
  constructor() {
    this.repeat = 0;
    this.url = '';
    this.met = '';
    this.limit = 0;
  }

  resultData(url, met, limit) {
    const myURL = new URL(url);
    const options = {
      hostname: '127.0.0.1',
      port: myURL.port,
      path: myURL.pathname + myURL.search,
      method: met,
      body: { limit },
      search: myURL.search,
      headers: { Authorization: AuthStr },
      json: true,
    };
    return new Promise((resolve, request) => {
      let body = '';
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
          body += data;
        });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            if (this.repeat !== 3) {
              this.repeat += 1;
              this.response(this.url, this.met, this.limit);
            } else {
              this.repeat = 0;
              resolve(body);
            }
          } else {
            request(body);
          }
        });
      });
      req.on('error', (error) => {
        console.log(error);
      });
      req.write(JSON.stringify(options.body));
      req.end();
    });
  }

  async response(url, met, limit) {
    this.url = url;
    this.met = met || 'GET';
    this.limit = limit || undefined;

    try {
      const res = await this.resultData(this.url, this.met, this.limit);
      // console.log(res);

      return res;
    } catch (error) {
      return error;
    }
  }
}

module.exports = HttpRequest;
