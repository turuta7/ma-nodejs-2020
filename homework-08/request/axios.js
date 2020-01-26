const axios = require('axios');
const qs = require('qs');

const axiosRetry = require('axios-retry');

axiosRetry(axios, {
  retries: 1,
  retryDelay: (retryCount) => {
    return retryCount * 100;
  },
});

const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;
class Axios {
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
      headers: { Authorization: AuthStr },
    };
  }

  resultData() {
    if (this.options.url)
      return new Promise((resolve, reject) => {
        axios(this.options)
          .then((result) => {
            resolve(result.data);
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

module.exports = Axios;