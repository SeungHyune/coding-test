const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [...A], [...B]] = input.map((a) => a.split(" ").map(Number));

A.sort((a, b) => a - b);
B.sort((a, b) => b - a);

let answer = 0;
for (let i = 0; i < N; i++) {
  answer += B[i] * A[i];
}

console.log(answer);
