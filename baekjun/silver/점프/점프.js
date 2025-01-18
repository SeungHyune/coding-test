const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solve(n, arr, dp) {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let value = arr[y][x];
      if (value === 0) continue;
      if (y + value < n) {
        dp[y + value][x] += BigInt(dp[y][x]);
      }
      if (x + value < n) {
        dp[y][x + value] += BigInt(dp[y][x]);
      }
    }
  }
}

function main() {
  const n = Number(input.shift());
  const arr = input.map((a) => a.split(" ").map(Number));

  let dp = new Array(n).fill([]).map((x) => new Array(n).fill(BigInt(0)));

  dp[0][0] = 1;

  solve(n, arr, dp);
  console.log(dp[n - 1][n - 1].toString());
}

main();
