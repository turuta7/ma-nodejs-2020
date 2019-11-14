const { task1: newTask1, task2: newTask2, task3: newTask3 } = require('./task');

async function boot() {
  const myTask1 = await newTask1(3, 3, 4);
  console.log(myTask1);
  const myTask2 = await newTask2('Earth', 12742, 7.5).outputResult();
  console.log(myTask2);
  const myTask3 = await newTask3(5000, 'my text');
  console.log(myTask3);
}

boot();
