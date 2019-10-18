// tesk 4
let objectOne = {};
const objectTwo = new Object();

objectOne = {
  name: "Object A",
  age: 21
};

objectTwo.name2 = "Object B";
objectTwo.age2 = 30;

const { name, age } = objectOne;
const { name2, age2 } = objectTwo;

console.log(objectOne);
console.log(objectTwo);

console.log(`objectOne: name: ${name}, age: ${age}`);
console.log(`objectTwo: name: ${name2}, age: ${age2}`);
