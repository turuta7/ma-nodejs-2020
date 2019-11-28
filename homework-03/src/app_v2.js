class CheckNumber {
  constructor() {
    this.naturalNumber = 0;
    this.counter = 3;
    this.index = 2;
    this.counterFor = 4;
  }

  run() {
    this.index = this.counter - 1;

    setInterval(() => {
      if (this.counterFor === this.index) {
        this.naturalNumber = this.counterFor;
        // console.log( this.counterFor);

        this.index = 2;
        this.counterFor += 1;
      } else if (this.counterFor % this.index === 0) {
        this.counterFor += 1;
        this.index = 2;
      } else this.index += 1;
    }, 0);

    setInterval(() => {
      console.log(`-- IN PROCESS -- Biggest prime number found:${this.naturalNumber}`);
    }, 1000);
  }
}

const checkNumber = new CheckNumber();
checkNumber.run();
