const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...rgb] = input.map((v) => v.split(" ").map(Number));

function solution(N, rgb) {
  const dp = rgb;

  for (let i = 1; i < N; i++) {
    dp[i][0] = dp[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] = dp[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] = dp[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
  }

  console.log(Math.min(...dp[N - 1]));
}

solution(N, rgb);
