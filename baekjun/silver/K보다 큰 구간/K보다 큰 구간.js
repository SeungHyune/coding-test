const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const K = Number(input.pop());
const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

if (N === 1) {
  arr[0] > K ? console.log(1) : console.log(0);
  return;
}

let answer = 0;

for (let i = 0; i < N; i++) {
  const cur = arr[i];

  let sum = cur;

  if (sum > K) {
    answer += N - i;
    continue;
  }

  let j = i + 1;
  while (j < N) {
    sum += arr[j];

    if (sum > K) {
      answer += N - j;
      break;
    }

    j++;
  }
}

console.log(answer);
