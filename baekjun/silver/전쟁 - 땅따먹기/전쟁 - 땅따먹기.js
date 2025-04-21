const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = +input[0];
let idx = 1;

for (let t = 0; t < T; t++) {
  const arr = input[idx++].split(" ");
  const n = +arr[0];
  const nums = arr.slice(1);

  // 후보 찾기
  let count = 0;
  let candidate = null;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
      count = 1;
    } else if (num === candidate) {
      count++;
    } else {
      count--;
    }
  }

  // 후보 검증
  let freq = 0;
  for (const num of nums) {
    if (num === candidate) freq++;
  }

  if (freq > n / 2) {
    console.log(candidate);
  } else {
    console.log("SYJKGW");
  }
}
