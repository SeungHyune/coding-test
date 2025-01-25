const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, s, m] = input[0].split(" ").map((v) => +v);
const v = input[1].split(" ").map((v) => +v);

const dp = [...Array(n)].map(() => Array(m + 1).fill(0));
if (s + v[0] <= m) dp[0][s + v[0]] = 1;
if (s - v[0] >= 0) dp[0][s - v[0]] = 1;

for (let i = 1; i < n; i++) {
  for (let j = 0; j <= m; j++) {
    if (dp[i - 1][j]) {
      if (j + v[i] <= m) dp[i][j + v[i]] = 1;
      if (j - v[i] >= 0) dp[i][j - v[i]] = 1;
    }
  }
}
for (let j = m; j >= 0; j--) {
  if (dp[n - 1][j]) {
    console.log(j);
    process.exit();
  }
}
console.log(-1);
