// task 5
const data = '21345A67098';

console.log(data.split('').map(x => {
    if (x % 2 === 0 && x !== 0 && x !== '0') return x;
    return false;
})
    .filter(x => x).join(''));