const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, K], ...arr] = input.map((a) => a.split(" ").map(Number));

// 얼음 양동이가 하나 밖에 없는 경우
if (N === 1) {
  console.log(arr[0][0]);
  return;
}

arr.sort((a, b) => a[1] - b[1]);

let [left, right] = [0, 1];
let maximum = K * 2;

let ice = arr[left][0];

let answer = arr[left][0];

while (right < N) {
  if (arr[right][1] - arr[left][1] <= maximum) {
    // right를 더 늘려서 더 많은 얼음의 합을 구할 수 있음
    ice += arr[right][0];
    right++;
  } else {
    // right의 값을 고정한채 left 값을 늘려야함
    // 현재 값으로는 얼음의 합을 구할 수 없음
    ice -= arr[left][0];
    left++;
  }

  answer = Math.max(answer, ice);
}

console.log(answer);
