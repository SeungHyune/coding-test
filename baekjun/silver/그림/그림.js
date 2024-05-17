// 그림의 넓이가 가장 넓은 것의 넓이를 출력하라
// 그림은 가로, 세로로 연결되어 있다. 대각선은 떨어진 그림이다.
// 그림의 넓이는 1의 개수이다.
// 만약 그림이 하나도 존재하지 않는다면 넓이는 0이다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

function solution() {
  let [answer, paintingLength] = [Number.MIN_SAFE_INTEGER, 0];

  const nx = [-1, 0, 1, 0];
  const ny = [0, 1, 0, -1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 0) {
        continue;
      }

      let painting = 1;
      paintingLength++;

      const queue = [[i, j]];
      arr[i][j] = 0;

      while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (let k = 0; k < 4; k++) {
          const dx = x + nx[k];
          const dy = y + ny[k];

          if (dx < 0 || dy < 0 || dx >= N || dy >= M || arr[dx][dy] === 0) {
            continue;
          }

          queue.push([dx, dy]);
          arr[dx][dy] = 0;
          painting++;
        }
      }

      if (answer < painting) {
        answer = painting;
      }
    }
  }

  if (paintingLength === 0) {
    return [0, 0].join("\n");
  }

  return [paintingLength, answer].join("\n");
}

console.log(solution());
