const { throwDicePromise: throwDice, set } = require('./func/function');

let result = 0;

set(700).then(() => {
  throwDice()
    .then((firstThrow) => {
      if (firstThrow === 0) throw new Error('Lost dice');
      console.log(`First throw: ${firstThrow}`);
      result += firstThrow;
      set(1300).then(() => {
        throwDice().then((secondThrow) => {
          if (secondThrow === 0) throw new Error('Lost dice');
          console.log(`Second throw: ${secondThrow}`);
          result += secondThrow;
          set(1000).then(() => {
            console.log(`result: ${result}`);
          });
        });
      });
    })
    .catch((err) => console.log(err));
});
