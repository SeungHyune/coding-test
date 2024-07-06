const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const dp = Array(N + 1).fill(0);

for (let i = 0; i < N; i++) {
  const [period, cost] = arr[i];
  const endDay = i + period;

  if (endDay <= N) {
    dp[endDay] = Math.max(dp[endDay], dp[i] + cost);
  }

  dp[i + 1] = Math.max(dp[i + 1], dp[i]);
}

console.log(Math.max(...dp));
