// 이동은 상하좌우, 육지(L)로만 가능
// 한 칸 이동하는데 한 시간이 걸린다.

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

let result = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === "W") {
      continue;
    }

    const checker = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => 0)
    );

    const queue = [[i, j, 0]];

    while (queue.length) {
      const [x, y, time] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= N || dy >= M) {
          continue;
        }

        if (arr[dx][dy] === "W" || (i === dx && j === dy)) {
          continue;
        }

        if (checker[dx][dy] === 0 || checker[dx][dy] > time + 1) {
          checker[dx][dy] = time + 1;
          queue.push([dx, dy, time + 1]);
        }
      }
    }

    console.log(checker);

    const maxTime = Math.max(...checker.flatMap((time) => time));
    result = Math.max(result, maxTime);
  }
}

console.log(result);
