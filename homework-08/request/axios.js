const axios = require('axios');
const qs = require('qs');
// const rax = require('retry-axios');
const axiosRetry = require('axios-retry');

axiosRetry(axios, { retries: 3 });

const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;

class Axios {
  constructor(url, met = 'get', limit = undefined) {
    this.limit = limit;
    this.url = url;
    this.method = met;
    this.options = {
      method: this.method,
      raxConfig: {
        // retry: 3,
        retryDelay: 100,
      },
      url: this.url,
      data: qs.stringify({
        limit: this.limit,
      }),
      headers: { Authorization: AuthStr },
    };
  }

  resultData() {
    if (this.options.url) return axios(this.options);
    return false;
  }

  async response() {
    try {
      const random = Math.floor(Math.random() * 3);
      if (random === 1) {
        return JSON.stringify({
          message: 'Internal error occurred',
        });
        //  throw new Error('new error');
      }
      const res = await this.resultData();
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
}

module.exports = Axios;
