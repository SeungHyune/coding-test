let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let arr = input[1].split(" ").map((n) => Number(n));
let max = 0; // 최대 과일 갯수를 담을 변수
let group = Array(10).fill(0); // group [i] 는 현재 그룹에서 i번 과일이 몇개 있는지 나타냄
let left = 0; // 왼쪽 idx
let right = 0; // 오른쪽 idx
let count = 0; // 과일 갯수
let kind = 0; // 과일 종류
while (right < arr.length) {
  if (group[arr[right]] === 0) {
    kind += 1;
  }
  group[arr[right]] += 1;
  ++count;
  if (kind > 2) {
    // kind 2 될때까지 left를 올림

    while (kind > 2) {
      group[arr[left]] -= 1;
      if (group[arr[left]] === 0) {
        kind -= 1;
      }
      count -= 1;
      ++left;
    }
  }
  max = Math.max(max, count);
  ++right;
}

console.log(max);
