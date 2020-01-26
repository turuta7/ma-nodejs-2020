const http = require('http');
const qs = require('qs');

const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;

class HttpRequest {
  constructor(url, met = 'get', limit = undefined) {
    this.limit = limit;
    this.url = url;
    this.method = met;
    this.options = {
      method: this.method.toUpperCase(),
      hostname: this.url,
      data: qs.stringify({
        limit: this.limit,
      }),

      headers: { Authorization: AuthStr },
      json: true,
    };
  }

  resultData() {
    if (this.options.url)
      return new Promise((resolve) => {
        http.request(this.options, (res) => {
          console.log(this.options);
          res.setEncoding('utf8');
          let fullData = '';
          res.on('data', (chank) => {
            fullData += chank;
          });
          console.log(fullData);
          res.on('end', () => {
            res.data = fullData;

            resolve(res);
          });
        });
      });

    return false;
  }

  async response() {
    try {
      const res = await this.resultData();
      const random = Math.floor(Math.random() * 3);
      if (random === 1) {
        throw new Error(
          JSON.stringify({
            message: 'Internal error occurred',
          }),
        );
      }
      return res;
    } catch (error) {
      if (error.message) return JSON.parse(error.message);
      return JSON.parse(error);
    }
  }
}

module.exports = HttpRequest;
