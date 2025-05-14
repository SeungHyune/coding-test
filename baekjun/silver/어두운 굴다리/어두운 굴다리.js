const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 초반 셋팅
let [N] = input[0].split(" ").map(Number);
let [M] = input[1].split(" ").map(Number);
lightArr = input[2].split(" ").map(Number);
let max = 0;
for (let i = 0; i < lightArr.length; i++) {
  if (i === 0) {
    max = Math.max(lightArr[i], max);
  }
  if (i === lightArr.length - 1) {
    max = Math.max(N - lightArr[i], max);
    break;
  }
  max = Math.max(Math.ceil((lightArr[i + 1] - lightArr[i]) / 2), max);
}
console.log(max);
