class CheckNumber {
  constructor() {
    this.naturalNumber = 0;
    this.counter = 2;
  }

  async checkForANaturalNumber(num) {
    for (let i = 2; i < num; i += 1) {
      if (num % i === 0) return false;
    }
    this.naturalNumber = num;
    return true;
  }

  run() {
    setInterval(async () => {
      await this.checkForANaturalNumber((this.counter += 1));
    }, 0);

    setInterval(() => {
      console.log(this.naturalNumber);
    }, 1000);
  }
}

const checkNumber = new CheckNumber();
checkNumber.run();
