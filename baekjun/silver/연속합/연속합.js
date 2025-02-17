const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

const dp = [arr[0]];
for (let i = 1; i < N; i++) {
  dp[i] = arr[i] > arr[i] + dp[i - 1] ? arr[i] : arr[i] + dp[i - 1];
}
console.log(Math.max(...dp));
