const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], [...arr]] = input.map((a) => a.split(" ").map(Number));

arr.sort((a, b) => a - b);

let [left, right] = [0, N - 1];
let answer = 0;

while (left < right) {
  const sum = arr[left] + arr[right];

  if (left === right) break;

  if (sum >= M) {
    answer++;
    left++;
    right--;
  } else {
    left++;
  }
}

console.log(answer);
