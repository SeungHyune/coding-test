const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const line = input[1].split(" ").map(Number);
const arr = input.slice(2).map((a) => a.split(" ").map(Number));

line.sort((a, b) => a - b);

let index = 0;
let answer = [];

while (arr.length > index) {
  const [start, end] = arr[index++];

  let startIndex = func("start", start);
  let endIndex = func("end", end);

  if (startIndex === null || endIndex === null) {
    answer.push(0);
    continue;
  }

  const result = endIndex - startIndex;

  if (result < 0) {
    answer.push(0);
  } else {
    answer.push(result + 1);
  }
}

function func(type, target) {
  let [start, end] = [0, N - 1];

  let index = null;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (type === "start") {
      if (line[mid] >= target) {
        index = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else if (type === "end") {
      if (line[mid] <= target) {
        index = mid;
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  return index;
}

console.log(answer.join("\n"));
