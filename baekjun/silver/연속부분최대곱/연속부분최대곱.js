const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, ...arr] = input.map(Number);

const dp = Array.from({ length: N }, () => 0);
dp[0] = arr[0];

let result = arr[0];

for (let i = 1; i < N; i++) {
  const current = arr[i];

  dp[i] = Math.max(current, Number(current * dp[i - 1]));
  result = Math.max(dp[i], result);
}

console.log(result.toFixed(3));
