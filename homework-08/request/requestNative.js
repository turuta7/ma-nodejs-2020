// const request = require('request');
const rp = require('promise-request-retry');

// const rp = require('request-promise-native');
const qs = require('qs');

const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;

class RequestNative {
  constructor(url, met = 'get', limit = undefined) {
    this.limit = limit;
    this.url = url;
    this.method = met;
    this.options = {
      method: this.method,
      url: this.url,
      data: qs.stringify({
        limit: this.limit,
      }),
      retry: 2,
      delay: 300,
      headers: { Authorization: AuthStr },
      json: true,
    };
  }

  resultData() {
    if (this.options.url)
      return new Promise((resolve, reject) => {
        rp(this.options)
          .then((result) => {
            resolve(result);
          })
          .catch(() => {
            reject(JSON.stringify({ message: 'error axios' }));
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

module.exports = RequestNative;
