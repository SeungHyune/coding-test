// 좋은 구간이란?
// 좋은 구간이란
// 두 정수 A, B가 주어졌을 때
// 찾으려는 값 N를 A <= N <= B로 포함해야한다.
// 하지만 집합의 수에는 포함되면 안된다.

// ex) 집합 [1, 4, 5, 10, 20] 이고 N = 3이라면
// [2, 3] 만 가능하다. N이 집합에 없는 구간 부터 시작할 수 있으며, N을 정수 A, B가 포함하거나
// A, B 범위 내에 N이 존재해야 한다.

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const S = Number(input.shift()) + 1;
const N = Number(input.pop());

const arr = [0, ...input[0].split(" ").map(Number)];
arr.sort((a, b) => a - b);

let [left, right] = [0, 1];

let answer = 0;

while (left < right && right < S) {
  const start = arr[left];
  const end = arr[right];

  let [l, r] = [start + 1, end - 1];
  // l, r 구간에 대한 조건 확인 필요
  // 2, 6
  // [2,3], [2,4], [2,5], [2,6]
  while (l <= N && N <= r) {
    while (l < r && l <= N && N <= r) {
      answer++;
      r--;
    }

    l++;
    r = end - 1;
  }

  left++;
  right++;
}

console.log(answer);
