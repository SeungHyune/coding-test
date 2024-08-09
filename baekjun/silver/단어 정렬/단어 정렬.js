const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, ...arr] = input;

const setArr = [...new Set(arr)];

setArr.sort((a, b) => {
  if (a.length === b.length) {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  }

  return a.length - b.length;
});

console.log(setArr.join("\n"));
