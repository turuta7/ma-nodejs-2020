const User = require('../DB/user');

module.exports = (headers) => {
  const auth = `Basic ${Buffer.from(`${User.user}:${User.pass}`).toString('base64')}`;
  if (headers === auth) return true;
  return false;
};
