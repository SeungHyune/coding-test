// 8 4 2 1 1
// 9 5 3 2 1

// 1 1
// 2 1

// 20 10 5 3 2 1
// 31 16 8 4 2 1

// 35000 17500 8750 4375 2188 1094 547 274 137 69 35 18 9 5 3 2 1
// 1000 500 250 125 73 37 19 10 5 3 2 1

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, A, B] = input[0].split(" ").map(Number);

let answer = 0;

while (N > 0) {
  N = N / 2;

  A = Math.ceil(A / 2);
  B = Math.ceil(B / 2);

  answer++;

  if (A === B) {
    return console.log(answer);
  }
}

if (answer === 0) {
  console.log(-1);
}

console.log(answer);
