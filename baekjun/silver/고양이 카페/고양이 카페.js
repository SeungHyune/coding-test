const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, K], [...arr]] = input.map((a) => a.split(" ").map(Number));

arr.sort((a, b) => a - b);

let [left, right] = [0, N - 1];
let answer = 0;

while (left < right) {
  const sum = arr[left] + arr[right];

  if (sum > K) {
    right--;
  } else {
    answer++;
    left++;
    right--;
  }
}

console.log(answer);
