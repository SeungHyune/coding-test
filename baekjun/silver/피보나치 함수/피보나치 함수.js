const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, ...arr] = input.map(Number);

const dp = Array.from({ length: 41 }, () => 0);

for (const N of arr) {
  if (dp[N] !== 0) {
    console.log(dp[N].join(" "));
    continue;
  }

  fibonacci(N, [0, 0]);

  console.log(dp[N].join(" "));
}

function fibonacci(N, fibo) {
  if (dp[N] !== 0) {
    fibo[0] += dp[N][0];
    fibo[1] += dp[N][1];
    return;
  }
  if (N === 0) {
    fibo[0]++;
    return (dp[N] = [1, 0]);
  } else if (N === 1) {
    fibo[1]++;
    return (dp[N] = [0, 1]);
  } else {
    fibonacci(N - 1, fibo) + fibonacci(N - 2, fibo);
    return (dp[N] = [...fibo]);
  }
}
