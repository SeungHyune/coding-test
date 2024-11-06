const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [A, B, N, M] = input.shift().split(" ").map(Number);

const dp = Array.from({ length: 100001 }, () => Infinity);
dp[N] = 0;

const queue = [N];

while (queue.length > 0) {
  const current = queue.shift();

  for (const next of [
    current - 1,
    current + 1,
    current * A,
    current * B,
    current + A,
    current - A,
    current + B,
    current - B,
  ]) {
    if (next < 0 || next > 100001) continue;

    if (dp[next] > dp[current] + 1) {
      dp[next] = dp[current] + 1;
      queue.push(next);

      if (next === M) {
        break;
      }
    }
  }
}

console.log(dp[M]);
