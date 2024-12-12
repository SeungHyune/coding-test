const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], [...arr]] = input.map((a) => a.split(" ").map(Number));

let [start, end] = [1, 10000 * 100000];
let answer;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let length = 1;
  let size = mid;
  let flag = true;

  for (let i = 0; i < N; i++) {
    if (size >= arr[i]) {
      size -= arr[i];
    } else {
      size = mid;
      length++;

      if (size < arr[i]) {
        flag = false;
        break;
      }

      size -= arr[i];
    }
  }

  if (flag === false || length > M) {
    start = mid + 1;
  } else {
    end = mid - 1;
    answer = mid;
  }
}

console.log(answer);
