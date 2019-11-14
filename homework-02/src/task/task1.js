function sum() {
  const newArray = [...arguments];
  return newArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
}
module.exports = sum;
