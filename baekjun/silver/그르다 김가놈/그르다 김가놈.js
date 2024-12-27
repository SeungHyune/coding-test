const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map(Number);

const max = Math.max(...arr);

let [start, end] = [1, max];
let answer = -1;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let count = 0;
  for (const a of arr) {
    if (K >= a) {
      continue; // 폐기
    } else if (a < K * 2) {
      // 한쪽 꼬다리만 자름
      count += Math.floor((a - K) / mid);
    } else {
      // 양쪽 꼬다리 자름
      count += Math.floor((a - K * 2) / mid);
    }
  }

  if (count >= M) {
    answer = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
