const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

let [left, right] = [0, N - 1];
let answer = Number.MAX_SAFE_INTEGER;

while (left < right) {
  const diff = arr[right] + arr[left];

  if (Math.abs(answer) > Math.abs(diff)) {
    answer = diff;
  }

  if (diff < 0) {
    left++;
  } else {
    right--;
  }
}

console.log(answer);
