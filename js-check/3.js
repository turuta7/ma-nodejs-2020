// tesk 3
const index = 'o';
const text = 'Hello World!';

for (let i = 0; i < text.length; i += 1) {
    if (text[i] === index) console.log(i + 1);
}

const dellText = 'l';

console.log(text.split('').map(x => {
    if (x !== dellText) return x;
    return false;
})
    .filter(x => x)
    .join(''));