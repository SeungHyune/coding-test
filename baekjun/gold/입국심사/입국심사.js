const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(" ").map(Number);
const arr = input.map(Number);
arr.sort((a, b) => a - b);

let max = BigInt(M) * BigInt(arr[N - 1]);
let [start, end] = [BigInt(1), max];
let answer;

while (start <= end) {
  const mid = BigInt((start + end) / 2n);

  let audit = BigInt(0);
  for (const time of arr) {
    audit += mid / BigInt(time);

    if (audit > M) break;
  }

  if (audit >= M) {
    answer = mid;
    end = mid - 1n;
  } else {
    start = mid + 1n;
  }
}

console.log(String(answer));
