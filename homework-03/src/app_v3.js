class CheckNumber {
  constructor() {
    this.naturalNumber = 0;
    this.counter = 3;
    this.index = 0;
    this.counterFor = 0;
  }

  run() {
    this.index = this.counter - 1;

    setInterval(() => {
      if (this.counter % this.index !== 0) {
        if (this.index === 0) {
          if (this.counterFor <= 1) {
            this.naturalNumber = this.counter;
            // console.log(this.counter);
          }
          this.counterFor = 0;
          this.counter += 1;
          this.index = this.counter;
        }
      } else {
        this.counterFor += 1;
      }
      this.index -= 1;
    }, 0);
    setInterval(() => {
      console.log(`-- IN PROCESS -- Biggest prime number found:${this.naturalNumber}`);
    }, 1000);
  }
}

const checkNumber = new CheckNumber();
checkNumber.run();
