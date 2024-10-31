const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let T = Number(input.shift());

while (T--) {
  const [N, K] = input.shift().split(" ").map(Number);
  const arr = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let [diff, count] = [Infinity, 0];
  let [left, right] = [0, N - 1];

  while (left < right) {
    const sum = arr[left] + arr[right];
    const compareSum = Math.abs(sum - K);

    if (diff > compareSum) {
      diff = compareSum;
      count = 1;
    } else if (diff === compareSum) {
      count++;
    }

    if (sum > K) {
      right--;
    } else if (sum < K) {
      left++;
    } else {
      right--;
      left++;
    }
  }

  console.log(count);
}
