// M의 정수들이 A의 정수 집합에 포함되는지 검사한 후 해당 정수가 존재한다면 1, 존재하지 않다면 0을 출력한다.
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());
const arrN = input.shift().split(" ").map(Number);
const M = Number(input.shift());
const arrM = input.shift().split(" ").map(Number);

// M 정수가 A집합에 존재하는지 빠른 탐색을 위해 오름차순 정렬을 진행합니다.
arrN.sort((a, b) => a - b);

const result = [];

for (const M of arrM) {
  let [start, end] = [0, N - 1];

  let flag = 0;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (M === arrN[mid]) {
      flag = 1;
      break;
    } else if (M < arrN[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  result.push(flag);
}

console.log(result.join("\n"));
