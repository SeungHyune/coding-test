const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(...input);

function solution(n) {
  const dp = Array.from({ length: n + 1 }, () => 0);

  dp[1] = 1;
  dp[2] = 3;

  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 2] * 2 + dp[i - 1]) % 10007;
  }

  return dp[n];
}

console.log(solution(n));
