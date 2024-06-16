const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
const cases = Number(input[0]);
input.shift();
for (let num = 0; num < cases; num++) {
  const count = Number(input[3 * num]);
  const up = input[3 * num + 1].split(" ").map((v) => Number(v));
  const down = input[3 * num + 2].split(" ").map((v) => Number(v));
  const dp = [[0, up[0], down[0]]];
  for (let i = 1; i < count; i++) {
    dp[i] = [
      Math.max(...dp[i - 1]),
      Math.max(dp[i - 1][0], dp[i - 1][2]) + up[i],
      Math.max(dp[i - 1][0], dp[i - 1][1]) + down[i],
    ];
  }
  console.log(Math.max(...dp[count - 1]));
}
