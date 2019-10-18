// task 7
const element = "apple";

const vegetables = ["potato", "tomato", "cucumber"];
const fruits = ["apple", "pineapple", "banana"];

// varian if
if (vegetables.includes(element) === true) {
  console.log(`element "${element}" in array: vegetables`);
} else if (fruits.includes(element) === true) {
  console.log(`element "${element}" in array: fruits`);
} else console.log(`no element "${element}" in array`);

// varian switch-case
function test(arr) {
  switch (arr.includes(element)) {
    case true:
      console.log(`element "${element}" in array:`);
      break;
    default:
      console.log(`no element "${element}" in array`);
  }
}

test(fruits);
