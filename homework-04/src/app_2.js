const { throwDicePromise: throwDice, set } = require('./func/function');

Promise.resolve()
  .then(() => set(700).then(() => throwDice()))
  .then((firstThrow) => {
    if (firstThrow === 0) throw new Error('Lost dice');
    console.log(`firstThrow ${firstThrow}`);
    return firstThrow;
  })
  .then((firstThrow) =>
    set(1300).then(() => {
      return throwDice().then((secondThrow) => {
        if (secondThrow === 0) throw new Error('Lost dice');
        console.log(`secondThrow ${secondThrow}`);
        return secondThrow + firstThrow;
      });
    }),
  )
  .then((retult) => set(1000).then(() => console.log(`retult: ${retult}`)))
  .catch((err) => {
    console.error(err);
    return 'Lost dice';
  });

// const promiseOne = Promise.resolve().then(() => {
//   return set(700)
//     .then(() => throwDice())
//     .then((firstThrow) => {
//       if (firstThrow === 0) throw new Error('Lost dice');
//       console.log(`First throw: ${firstThrow}`);
//       return firstThrow;
//     })
//     .catch((err) => {
//       console.error(err);
//       return 'Lost dice';
//     });
// });

// const promiseTwo = Promise.resolve().then(() => {
//   return set(1300)
//     .then(() => throwDice())
//     .then((secondThrow) => {
//       if (secondThrow === 0) throw new Error('Lost dice');
//       console.log(`Second throw: ${secondThrow}`);
//       return secondThrow;
//     })
//     .catch((err) => {
//       console.error(err);
//       return 'Lost dice';
//     });
// });

// Promise.all([promiseOne, promiseTwo]).then((values) => {
//   values.map((x) => {
//     if (x === 'Lost dice') throw new Error('');
//     return '';
//   });
//   return set(1000).then(() => {
//     const result = values.reduce((sum, current) => {
//       return sum + current;
//     }, 0);
//     console.log(`result: ${result}`);
//   });
// });

// varian two

// Promise.resolve()
//   .then(() => {
//     return set(700)
//       .then(() => throwDice())
//       .then((firstThrow) => {
//         console.log(`First throw: ${firstThrow}`);
//         return firstThrow;
//       });
//   })
//   .then((firstThrow) => {
//     return set(1300)
//       .then(() => throwDice())
//       .then((secondThrow) => {
//         console.log(`Second throw: ${secondThrow}`);
//         return [firstThrow, secondThrow];
//       });
//   })
//   .then(([firstThrow, secondThrow]) => {
//     setTimeout(() => {
//       console.log(`result ${firstThrow + secondThrow}`);
//     }, 1000);
//   })
//   .catch((err) => {
//     console.error(err);
//     return 'Lost dice';
//   });
