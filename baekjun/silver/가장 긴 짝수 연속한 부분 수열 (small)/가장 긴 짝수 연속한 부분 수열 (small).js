const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = (input) => {
  let [n, k] = input
    .shift()
    .split(" ")
    .map((v) => +v);
  let arr = input
    .shift()
    .split(" ")
    .map((v) => +v);

  let max = 0;
  let left = 0;
  let oddCnt = 0;

  for (let right = 0; right < n; right++) {
    if (arr[right] % 2 !== 0) {
      oddCnt += 1;
    }

    while (oddCnt > k) {
      if (arr[left] % 2 !== 0) {
        oddCnt -= 1;
      }
      left += 1;
    }

    max = Math.max(max, right - left + 1 - oddCnt);
  }

  console.log(max);
};

solution(input);
