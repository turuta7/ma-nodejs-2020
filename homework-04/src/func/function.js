const min = 0;
const max = 6;

async function throwDiceAsync() {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

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

function set(time, text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, time);
  });
}

module.exports = { throwDiceAsync, throwDicePromise, throwDice, set };
