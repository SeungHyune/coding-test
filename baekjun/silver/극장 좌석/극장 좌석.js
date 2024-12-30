const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const arr = input.slice(2).map(Number);

const dp = Array.from({ length: N + 1 }, () => 1);

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

let answer = 1;
let vipIdx = 0;

for (let i = 0; i < M; i++) {
  const vip = arr[i];
  answer *= dp[vip - vipIdx - 1];
  vipIdx = vip;
}

answer *= dp[N - vipIdx];

console.log(answer);
