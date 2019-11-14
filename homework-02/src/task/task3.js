function pormise(timer = 2000, text = 'default text') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`milliseconds = ${timer}, resolve text: ${text}`);
    }, timer);
  });
}

module.exports = pormise;
