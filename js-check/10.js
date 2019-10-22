const keys = new Map([
  ["key1", "test1"],
  ["key2", "test2"],
  ["key3", "task1"],
  ["key4", "task2"],
  ["key5", "turuta"]
]);

class Storage {
  constructor(key) {
    this.key = key;
    this.limit = 5;
  }

  list() {
    return new Promise((resolve, reject) => {
      this.limit -= 1;
      if (this.limit >= 0) {
        setTimeout(() => {
          resolve(this.key);
        }, 1000);
      } else reject(new Error(`connection limit exceeded, try again later`));
      this.limit += 1;
    });
  }

  async destroy(key) {
    const res = await this.list().then(result => result);
    return new Promise((resolve, reject) => {
      this.limit -= 1;
      if (this.limit >= 0) {
        key.map(x => {
          res.delete(x);
          return resolve(console.log(`Key ${x} removed`));
        });
      } else reject(new Error(`connection limit exceeded, try again later`));
      this.limit += 1;
    });
  }

  async store(key, data) {
    const res = await this.list().then(result => result);
    this.limit -= 1;
    if (this.limit >= 0) {
      if (!key || !data) {
        console.log(`no key or data`);
        return;
      }
      return new Promise((resolve, reject) => {
        resolve(res.set(key, data));
      });
    } else reject(new Error(`connection limit exceeded, try again later`));
    this.limit += 1;
  }

  async fetch(key) {
    const res = await this.list().then(result => result);
    return new Promise((resolve, reject) => {
      this.limit -= 1;
      if (this.limit >= 0) {
        resolve(res.get(key));
      } else reject(new Error(`connection limit exceeded, try again later`));
      this.limit += 1;
    });
  }

  async destroyStartedWith(beginningOfKey) {
    const keyOut = [];
    const res = await this.list().then(result => result);
    return new Promise((resolve, reject) => {
      this.limit -= 1;
      if (this.limit >= 0) {
        for (let pair of res) {
          const boolean = pair[1].includes(beginningOfKey);
          if (boolean === true) {
            keyOut.push(pair[0]);
          }
        }
        this.destroy(keyOut);
        resolve();
      } else reject(new Error(`connection limit exceeded, try again later`));
      this.limit += 1;
    });
  }

  storeList() {
    return new Promise((resolve, reject) => {
      this.limit -= 1;
      if (this.limit >= 0) {
        arguments[0].map(x => {
          for (let key in x) {
            this.key.set(key, x[key]);
          }
          return "";
        });
        this.list().then(result => console.log(result));
        resolve(`saved key`);
      } else reject(new Error(`connection limit exceeded, try again later`));
      this.limit += 1;
    });
  }

  async fetchInTimeOrFail(key, timeout) {
    let error = false;
    return new Promise((resolve, reject) => {
      this.limit -= 1;
      if (this.limit >= 0) {
        setTimeout(() => {
          error = true;
          reject(new Error("504 Gateway Timeout"));
        }, timeout);
        setTimeout(() => {
          console.log(error);
          if (error === false) {
            resolve(this.destroyStartedWith(key));
          }
        }, 2000);
      } else reject(new Error(`connection limit exceeded, try again later`));
      this.limit += 1;
    });
  }
}
const storage = new Storage(keys);

// test#1

// storage.list().then(result => console.log(result));
// storage.list().then(result => console.log(result));
// storage.list().then(result => console.log(result));
// storage.list().then(result => console.log(result));
// storage.list().then(result => console.log(result));
// storage.list().then(result => console.log(result));

// test#2
// storage.fetchInTimeOrFail("key1", 1000);

// test#3
// storage.destroyStartedWith("tur");

// test#4
storage.fetch("key3").then(x => {
  if (x !== undefined) {
    console.log(`data: ${x}`);
  } else console.log("no key");
});

// test#5
// storage.store("firstKey", "firstNewTest").then(result => console.log(result));
// storage.list().then(result => console.log(result));

// test#6
// storage.storeList([
//   { newKey1: "text_A" },
//   { newKey2: "text_B" },
//   { newKey3: "text_C" }
// ]);

// test#7
// storage.fetchInTimeOrFail("t");
