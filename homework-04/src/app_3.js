const { throwDice, set } = require('./func/function');

async function run() {
  let result = 0;
  try {
    await set(700);
    const firstThrow = await throwDice();
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
    await set(1300);
    const secondThrow = await throwDice();
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
