const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map(Number);

let [start, end] = [1, Math.max(...arr)];
let answer = Infinity;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let children = 0;

  for (const len of arr) {
    children += Math.ceil(len / mid);
  }

  if (children <= N) {
    end = mid - 1;

    if (answer > mid) {
      answer = mid;
    }
  } else {
    start = mid + 1;
  }
}

console.log(answer);
