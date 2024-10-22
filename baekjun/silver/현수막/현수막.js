const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[M, N], ...arr] = input.map((a) => a.split(" ").map(Number));

const nx = [-1, -1, 0, 1, 1, 1, 0, -1];
const ny = [0, 1, 1, 1, 0, -1, -1, -1];

const visited = Array.from({ length: M }, () =>
  Array.from({ length: M }, () => false)
);

let result = 0;

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 0 || visited[i][j]) continue;

    visited[i][j] = true;

    result++;

    const queue = [[i, j]];
    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let k = 0; k < 8; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= M || dy >= N) continue;

        if (arr[dx][dy] === 0 || visited[dx][dy]) continue;

        visited[dx][dy] = true;
        queue.push([dx, dy]);
      }
    }
  }
}

console.log(result);
