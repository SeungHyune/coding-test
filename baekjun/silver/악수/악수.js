const fs = require("fs");
const n = fs.readFileSync("/dev/stdin").toString().trim();

if (n === 1) console.log(0);
else {
  let dp = new Array(n + 1);

  dp[0] = 1;
  dp[1] = 1;
  let N = n < 60 ? n + 1 : 60;
  for (let k = 2; k < N; ++k) {
    dp[k] = ((dp[k - 2] % 10) + (dp[k - 1] % 10)) % 10;
  }
  console.log(dp[n % 60]);
}
