const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], [...arr]] = input.map((a) => a.split(" ").map(Number));

const max = Math.max(...arr);

let [start, end] = [1, M * max];

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let balloon = 0;

  for (const a of arr) {
    balloon += Math.floor(mid / a);
  }

  if (balloon >= M) {
    answer = mid;
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(answer);
