const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], [...arr]] = input.map((a) => a.split(" ").map(Number));

let [start, end] = [1, 2000000000];
let answer = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  const tree = calc(mid);

  if (tree > M) {
    start = mid + 1;
  } else {
    end = mid - 1;
  }

  if (M <= tree && answer < mid) {
    answer = mid;
  }
}

function calc(mid) {
  let tree = 0;

  for (const len of arr) {
    tree += len - mid > 0 ? len - mid : 0;
  }

  return tree;
}

console.log(answer);
