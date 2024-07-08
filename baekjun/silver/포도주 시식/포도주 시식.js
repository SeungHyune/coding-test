const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();

const dp = Array.from({ length: N }, () => 0);
dp[0] = input[0];
dp[1] = input[1] + input[0];
dp[2] = Math.max(input[2] + input[1], input[2] + input[0]);
dp[3] = Math.max(
  input[3] + input[0] + input[1],
  input[3] + input[2] + input[0]
);

for (let i = 4; i < N; i++) {
  const first = input[i] + input[i - 1] + dp[i - 3];
  const second = input[i] + dp[i - 2];
  const thrid = input[i] + input[i - 1] + dp[i - 4];

  dp[i] = Math.max(first, second, thrid);
}

const result = Math.max(...dp.filter((num) => !isNaN(num)));

console.log(result);
