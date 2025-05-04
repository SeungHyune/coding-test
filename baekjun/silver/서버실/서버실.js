const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

let map = new Map();

let total = 0;
let [left, right] = [0, 0];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const num = arr[i][j];

    right = Math.max(right, num);

    total += num;
  }
}

const target = total / 2;
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  const time = getTime(mid);

  if (time >= target) {
    right = mid - 1;

    answer = mid;
  } else {
    left = mid + 1;
  }
}

function getTime(mid) {
  let total = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const num = arr[i][j];

      if (num <= mid) {
        total += num;
      } else {
        total += mid;
      }
    }
  }

  return total;
}

console.log(answer);
