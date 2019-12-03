const { throwDiceAsync: throwDice, set } = require('./func/function');

async function run() {
  let result = 0;
  try {
    const firstThrow = await throwDice(700);
    if (firstThrow === 0) {
      throw new Error('Lost dice');
    }

    result += firstThrow;
    console.log(`First throw: ${firstThrow}`);
  } catch (error) {
    console.error(error);
    return 'First throw = 0';
  }
  try {
    const secondThrow = await throwDice(1300);
    if (secondThrow === 0) {
      throw new Error('Lost dice');
    }
    result += secondThrow;
    console.log(`Second throw: ${secondThrow}`);
  } catch (error) {
    console.error(error);
    return 'Second throw = 0';
  }

  await set(1000);
  return `result: ${result}`;
}

run().then((x) => console.log(x));
