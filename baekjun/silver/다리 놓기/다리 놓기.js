const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const dp = Array.from({ length: 31 }, () =>
  Array.from({ length: 31 }, () => 0)
);

const dfs = (n, r) => {
  if (dp[n][r] > 0) return dp[n][r];
  if (n === r || r === 0) {
    return 1;
  } else {
    return (dp[n][r] = dfs(n - 1, r - 1) + dfs(n - 1, r));
  }
};

for (const [x, y] of arr) {
  const max = Math.max(x, y);
  const min = Math.min(x, y);

  if (max === min) {
    console.log(1);
  } else {
    dfs(max, min);
    console.log(dp[max][min]);
  }
}
