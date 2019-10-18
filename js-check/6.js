// task 6
const first = [1, 2, 3, 4, 5];
const second = [6, 7, 8, 9, 0];

function arrayProcessing(arr1, arr2) {
  const newArray = [];
  const length = first.length > second.length ? first.length : second.length;
  let i = 0;
  while (i < length) {
    if (arr2[i] !== undefined) newArray.push(arr2[i]);
    if (arr1[i] !== undefined) newArray.push(arr1[i]);
    i += 1;
  }
  return newArray.reverse();
}
console.log(arrayProcessing(first, second));
