const User = require('../DB/user');

module.exports = (headers) => {
  return `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}` === headers;
};
