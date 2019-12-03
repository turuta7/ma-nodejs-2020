const min = 0;
const max = 6;

function throwDicePromise() {
  const rand = min + Math.random() * (max + 1 - min);
  return new Promise((resolve) => {
    resolve(Math.floor(rand));
  });
}

function throwDice() {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function set(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

module.exports = { throwDicePromise, throwDice, set };
