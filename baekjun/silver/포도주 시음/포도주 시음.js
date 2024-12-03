const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, K], [...arr]] = input.map((a) => a.split(" ").map(Number));

arr.sort((a, b) => b - a);

let [left, right] = [0, N - 1];
let [answer, grape] = [0, 0];

let i = 1;
while (i <= K) {
  let direction;

  if (i % 2 === 0) {
    direction = right;
    right--;
  } else {
    direction = left;
    left++;
  }

  const tasty = arr[direction] - grape;
  grape = arr[direction];

  if (tasty > 0) {
    answer += tasty;
  }

  i++;
}

console.log(answer);
