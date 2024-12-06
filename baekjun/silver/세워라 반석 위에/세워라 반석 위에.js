function main(N, A) {
  const cnt = Array(9).fill(0);
  let ans = 0;

  for (let i = 0; i < N; i++) {
    const x = A[i];

    if (x - 2 > 0) cnt[x - 2]++;
    if (x - 1 > 0) cnt[x - 1]++;
    cnt[x]++;

    console.log(cnt);

    for (let j = 1; j < x - 2; j++) {
      ans = Math.max(ans, cnt[j]);
      cnt[j] = 0;
    }
    for (let j = x + 1; j < 9; j++) {
      ans = Math.max(ans, cnt[j]);
      cnt[j] = 0;
    }
  }

  for (let i = 1; i < 9; i++) {
    ans = Math.max(ans, cnt[i]);
  }

  return ans;
}

// 입력을 읽어오는 부분
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);
const A = input[1].split(" ").map(Number);

console.log(main(N, A));
