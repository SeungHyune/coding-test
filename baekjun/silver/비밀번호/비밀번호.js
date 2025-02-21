const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const T = input[0];
const memo = [[[1, 1, 1], [1, 1, 1], [1, 1, 1], [1]]];
const D = 1234567;
let answer = "";

function dp(n) {
  if (memo.length >= n) {
    return memo[n - 1];
  }

  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const im = memo[n - 2] || dp(n - 1);
  const m = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0]];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      for (let i = 0; i < 4; i++) {
        const ir = r + dr[i];
        const ic = c + dc[i];

        if (ir < 0 || ir >= 3 || ic < 0 || ic >= 3) {
          continue;
        }

        m[r][c] = (m[r][c] + im[ir][ic]) % D;
      }
    }
  }

  m[2][0] = (m[2][0] + im[3][0]) % D;
  m[3][0] = (m[3][0] + im[2][0]) % D;
  memo[n - 1] = m;

  return m;
}

function count(m) {
  let sum = 0;

  for (let r = 0; r < 4; r++) {
    const row = m[r];

    for (let c of row) {
      sum = (sum + c) % D;
    }
  }

  return sum;
}

for (let t = 1; t <= T; t++) {
  const N = input[t];

  answer += `${count(dp(N))}\n`;
}

console.log(answer);
