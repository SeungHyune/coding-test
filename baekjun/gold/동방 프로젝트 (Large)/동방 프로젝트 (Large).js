const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());
const M = Number(input.shift());
const arr = input.map((a) => a.split(" ").map(Number));

// 벽을 부수는 경우가 없는 경우 방을 그대로 출력한다.
if (arr.length === 0) {
  console.log(N);
  return;
}

// 내림차순 정렬, 만약 시작 숫자가 같은 경우 끝나는 숫자가 큰 숫자가 앞으로 오도록 정렬
arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return b[1] - a[1];
  }
  return b[0] - a[0];
});

function solution() {
  const resultArr = [arr.pop()];

  while (arr.length > 0) {
    const [start, end] = resultArr.pop();
    const [start2, end2] = arr.pop();

    // start2가 end보다 작거나 같다면 하나의 배열로 합쳐줍니다.
    // start2는 start보다 클 수가 없습니다.
    if (start2 <= end) {
      if (end > end2) {
        resultArr.push([start, end]);
      } else {
        resultArr.push([start, end2]);
      }
    } else {
      resultArr.push([start, end]);
      resultArr.push([start2, end2]);
    }
  }

  const visited = Array.from({ length: N + 1 }, () => false);

  while (resultArr.length > 0) {
    const [x, y] = resultArr.pop();

    for (let i = x; i < y; i++) {
      visited[i] = true;
    }
  }

  const wall = visited.filter((visit) => visit === false).length - 1;

  return wall;
}

console.log(solution());
