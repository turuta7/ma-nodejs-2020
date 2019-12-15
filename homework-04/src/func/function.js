const min = 0;
const max = 6;

function set(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
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

async function throwDiceAsync(time) {
  const rand = min + Math.random() * (max + 1 - min);
  await set(time);
  return Math.floor(rand);
}

module.exports = { throwDicePromise, throwDice, throwDiceAsync, set };
