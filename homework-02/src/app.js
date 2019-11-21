const { task1: newTask1, task2: newTask2, task3: newTask3 } = require('./task');

async function boot() {
  console.log(newTask1);
  console.log(await newTask3);
  console.log(newTask2);
}

boot();
