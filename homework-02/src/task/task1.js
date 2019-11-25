// task 1

/* eslint-disable no-constant-condition */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const my_number = -1;
let myNumber = 0;
let number = 3;
if (true) {
  const my_number = 1;
  myNumber = 2;
  number = 6;
}

function sum() {
  return my_number + myNumber + number;
}

module.exports = sum();
