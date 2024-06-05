// N*M 크기의 직사각형이 있다.
// 각 칸에는 한 자리 숫자가 적혀 있다.
// 이 직사각형에서 꼭짓점에 쓰여 있는 수가 모두 같은 가장 큰 정사각형을 찾아라
// 이때 정사각형의 행 또는 열에 평행해야 한다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split("").map(Number));

let answer = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const checkNum = arr[i][j];

    let dx = i;
    let dy = j;
    let k = 1;
    while (true) {
      if (dx + k >= N || dy + k >= M) break;

      const topRight = arr[dx][dy + k];
      const bottomLeft = arr[dx + k][dy];
      const bottomRight = arr[dx + k][dy + k];

      if (
        checkNum === topRight &&
        checkNum === bottomLeft &&
        checkNum === bottomRight &&
        answer < (k + 1) * (k + 1)
      ) {
        answer = (k + 1) * (k + 1);
      }

      k++;
    }
  }
}

console.log(answer);
