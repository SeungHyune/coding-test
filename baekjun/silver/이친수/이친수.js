// N = 1
// 1

// N = 2
// 10

// N = 3
// 101
// 100

// N = 4
// 1000
// 1010
// 1001

// N = 5
// 10000
// 10100
// 10101
// 10010
// 10001

// N = 6
// 100000
// 101000
// 100100
// 100010
// 100001
// 101010
// 101001
// 100101

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input);

const dp = Array.from({ length: N + 1 }, () => 1);

for (let i = 3; i <= N; i++) {
  dp[i] = BigInt(dp[i - 2]) + BigInt(dp[i - 1]);
}

console.log(String(dp[N]));
