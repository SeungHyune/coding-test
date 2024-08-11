const fs = require("fs");
const [A, B] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const sub = B.length - A.length;

let max = 0;

for (let i = 0; i <= sub; i++) {
  let sum = 0;

  for (let j = i; j < A.length + i; j++) {
    if (A[j - i] === B[j]) {
      sum++;
    }
  }

  max = Math.max(max, sum);
}

console.log(B.length - (max + sub));
