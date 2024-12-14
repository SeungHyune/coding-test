const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const M = Number(input[2]);

let [start, end] = [1, M];
let max = Math.max(...arr);
let answer;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let sum = 0;
  for (const a of arr) {
    if (a > mid) {
      sum += mid;
    } else {
      sum += a;
    }
  }

  if (sum > M) {
    end = mid - 1;
  } else {
    start = mid + 1;
    if (mid > max) {
      answer = max;
    } else {
      answer = mid;
    }
  }
}

console.log(answer);
