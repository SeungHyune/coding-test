const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [[N], [...arr]] = input.map((v) => v.split(" ").map(Number));
let answer = 0;

// 오름차순
let asc = 1;
for (let i = 0; i < N; i++) {
  if (arr[i] <= arr[i + 1]) {
    asc++;
  } else {
    asc = 1;
  }
  answer = Math.max(asc, answer);
}
// 내림차순
let desc = 1;
for (let i = 0; i < N; i++) {
  if (arr[i] >= arr[i + 1]) {
    desc++;
  } else {
    desc = 1;
  }
  answer = Math.max(desc, answer);
}
console.log(answer);
