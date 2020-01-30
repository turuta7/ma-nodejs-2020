const { RetryPromiseNative } = require('request-promise-native-retry');

const retryableStatusCodes = [404, 500, 400];
const retryableCodes = ['ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND'];
const retryOptions = {
  retries: 4,
  minTimeout: 10,
  maxTimeout: 300,
  randomize: false,
};

const retryPromiseNative = new RetryPromiseNative(
  retryableCodes,
  retryableStatusCodes,
  retryOptions,
);
const rp = retryPromiseNative.getClient();

const User = require('../src/DB/user');

const AuthStr = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;

class RequestNative {
  // eslint-disable-next-line class-methods-use-this
  resultData(url, met, limit) {
    if (url)
      return new Promise((resolve, reject) => {
        rp({
          method: met,
          url,
          body: { limit },
          headers: { Authorization: AuthStr },
          json: true,
          // transform(body, response) {
          //   if (response.headers['content-type'] === 'application/json') {
          //     response.body = JSON.parse(body);
          //   }
          //   return response;
          // },
        })
          .then((result) => {
            resolve(result);
          })
          .catch((e) => {
            if (e) reject(JSON.stringify(e.response.body));
            reject(JSON.stringify({ message: 'error axios' }));
          });
      });

    return false;
  }

  async response(url, met = 'get', limit = 100) {
    try {
      const res = await this.resultData(url, met, limit);
      return res;
    } catch (error) {
      if (error.message) return JSON.parse(error.message);
      return JSON.parse(error);
    }
  }
}

module.exports = RequestNative;
