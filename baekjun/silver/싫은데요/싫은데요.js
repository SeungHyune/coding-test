const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], [...arr]] = input.map((a) => a.split(" ").map(Number));

let [left, right] = [0, 1];
let [answer, sum] = [0, arr[0]];

while (left < right && right < N) {
  if (sum > M) {
    while (sum > M && left < right) {
      sum -= arr[left++];
    }

    answer = Math.max(answer, sum);

    if (right < N) {
      sum += arr[right++];
    }
  } else if (right < N) {
    sum += arr[right++];
  }

  if (sum <= M) {
    answer = Math.max(answer, sum);
  }
}

console.log(answer);
