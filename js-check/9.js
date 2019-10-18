function pormise(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(`Promis worked: ${milliseconds} milliseconds`));
    }, milliseconds);
  });
}

pormise(5000);
