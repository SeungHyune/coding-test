const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

arr.sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < N; i++) {
  let [start, end] = [i, N - 1];

  let mid = Math.floor((start + end) / 2);
  let maxMid = mid;

  while (start <= end && mid < N) {
    mid = Math.floor((start + end) / 2);

    if (arr[i] >= arr[mid] * 0.9) {
      start = mid + 1;
      maxMid = mid;
    } else {
      end = mid - 1;
    }
  }

  answer += maxMid - i;
}

console.log(answer);
