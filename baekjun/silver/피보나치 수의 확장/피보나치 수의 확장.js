const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

function solution(input) {
  const M = 1000000000;

  const n = Number(input);
  const dp = Array(Math.abs(n) + 1).fill(0);

  dp[1] = 1;
  if (n > 0) {
    for (let i = 2; i <= n; i++) {
      dp[i] = (dp[i - 1] % M) + (dp[i - 2] % M);
    }
  } else {
    for (let i = 2; i <= Math.abs(n); i++) {
      dp[i] = (dp[i - 2] % M) - (dp[i - 1] % M);
    }
  }
  const answer = dp[Math.abs(n)] % M;
  const sign = answer > 0 ? 1 : answer === 0 ? 0 : -1;
  console.log(sign);
  console.log(Math.abs(answer));
}

solution(input);
