const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map(Number);

const sortArr = arr.slice(0, N).sort((a, b) => a - b);
const qArr = arr.slice(N);

const answer = [];

for (const q of qArr) {
  let [start, end] = [0, N - 1];

  let result = -1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (sortArr[mid] === q) {
      result = mid;
      end = mid - 1;
    } else if (sortArr[mid] < q) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  answer.push(result);
}

console.log(answer.join("\n"));
