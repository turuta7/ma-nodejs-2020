const testTelephone = new RegExp(
  /^[(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{4}$/
);

const user = {
  firstName: "alex", // string
  lastName: "Doe", // string
  rate: 0.86, // number in range 0..1
  address: {
    // not empty object or null
    line1: "15 Macon St", // string
    line2: "", // string
    city: "Gotham" // string
  },
  phoneNumbers: [
    // array containing at least 1 element
    {
      type: "LINE", // string, limited to MOBILE | LINE | VOIP
      number: "(555) 555-1234" // string in specific format
    },
    {
      type: "LINE",
      number: "(555) 555-5678"
    }
  ]
};

// console.log(typeof(user.phoneNumbers[0].type === 'string'));

function testAObject(obj) {
  // test 1
  console.log("-----------------test1------------------");
  if (
    typeof obj.firstName === "string" &&
    typeof obj.lastName === "string" &&
    typeof obj.rate === "number" &&
    obj.rate < 1 &&
    obj.rate > 0
  ) {
    console.log(true);
  } else console.log("file type error");

  // test 2
  console.log("-----------------test2------------------");

  for (let i in obj.address) {
    const a1 = typeof obj.address[i];
    if (a1 === "string") {
      console.log(true);
    } else console.log(`file type error`);
  }

  // test 3
  console.log("-----------------test3------------------");
  for (let i = 0; i < obj.phoneNumbers.length; i += 1) {
    const resultTest1 = typeof obj.phoneNumbers[i].type;
    if (resultTest1 === "string") {
      if (testTelephone.test(obj.phoneNumbers[i].number)) {
        console.log(true);
      } else
        console.log(
          `user.phoneNumbers.number: "${obj.phoneNumbers[i].number}" invalid. arr ${i}`
        );
      console.log(true);
    } else
      console.log(
        `user.phoneNumbers.type: "${obj.phoneNumbers[i].type}" no string. arr ${i}`
      );
  }
  console.log("----------------------------------------");
}

testAObject(user);
