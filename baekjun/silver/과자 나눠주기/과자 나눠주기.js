const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[M, N], [...arr]] = input.map((a) => a.split(" ").map(Number));

arr.sort((a, b) => b - a);

let [start, end] = [1, arr[0]];
let answer = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let snack = 0;
  for (const len of arr) {
    snack += Math.floor(len / mid);

    if (snack >= M) {
      break;
    }
  }

  if (snack >= M) {
    // 과자를 나눠줄 수 있는 경우
    // 더 길이가 긴 과자로 나눠줄 수 있는지 찾아야함
    answer = mid;
    start = mid + 1;
  } else {
    // 과자를 나눠줄 수 없는 경우
    // 더 길이가 짧은 과자로 나눠줄 수 있는지 찾아야함
    end = mid - 1;
  }
}

console.log(answer);
