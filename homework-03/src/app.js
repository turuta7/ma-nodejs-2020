class CheckNumber {
  constructor() {
    this.naturalNumber = 0;
    this.counter = 2;
  }

  checkForANaturalNumber(num) {
    for (let i = 2; i < num; i += 1) {
      if (num % i === 0) return false;
    }
    this.naturalNumber = num;
    return true;
  }

  run() {
    setInterval(() => {
      this.checkForANaturalNumber((this.counter += 1));
    }, 0);

    setInterval(() => {
      console.log(`-- IN PROCESS -- Biggest prime number found:${this.naturalNumber}`);
    }, 1000);
  }
}

const checkNumber = new CheckNumber();
checkNumber.run();
