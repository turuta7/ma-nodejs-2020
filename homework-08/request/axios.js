const axios = require('axios');
const axiosRetry = require('axios-retry');

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 100;
  },
});

const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;
class Axios {
  // eslint-disable-next-line class-methods-use-this
  resultData(url, met, limit) {
    if (url)
      return new Promise((resolve, reject) => {
        axios({
          method: met,
          url,
          data: {
            limit,
          },
          headers: { Authorization: AuthStr },
        })
          .then((result) => {
            resolve(result.data);
          })
          .catch((e) => {
            if (e) reject(JSON.stringify(e.response.data));
            reject(JSON.stringify({ message: 'error axios' }));
          });
      });

    return false;
  }

  async response(url, met = 'get', limit = undefined) {
    try {
      const res = await this.resultData(url, met, limit);
      return res;
    } catch (error) {
      if (error.message) return JSON.parse(error.message);
      return JSON.parse(error);
    }
  }
}

module.exports = Axios;
