const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

let [resultNum, resultStr] = [0, ""];

for (let i = 0; i < M; i++) {
  const map = new Map();

  for (let j = 0; j < N; j++) {
    const str = arr[j][i];

    map.set(str, (map.get(str) || 0) + 1);
  }

  let str = "";
  let max = 0;

  for (const [key, value] of map) {
    if (value >= max) {
      if (value === max && key > str) continue;

      max = value;
      str = key;
    }
  }

  resultNum += N - max;
  resultStr += str;
}

console.log(resultStr);
console.log(resultNum);
