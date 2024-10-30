const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, K], [...arr]] = input.map((a) => a.split(" ").map(Number));

let answer = Infinity;
let [left, right] = [0, 0];
let [count, result] = [0, 1];

while (left <= right && right < N) {
  if (arr[right] === 1) {
    count++;
  }

  if (count < K) {
    result++;
    right++;
  } else if (count === K) {
    while (arr[left] === 2) {
      result--;
      left++;
    }

    answer = Math.min(answer, result);

    if (K === result) {
      return console.log(K);
    }

    left++;
    count--;
    right++;
  }
}

if (answer === Infinity) {
  console.log(-1);
} else {
  console.log(answer);
}
