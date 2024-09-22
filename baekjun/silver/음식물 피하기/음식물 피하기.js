const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M, K], ...arr] = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => ".")
);

for (const [x, y] of arr) {
  graph[x - 1][y - 1] = "#";
}

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

let result = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (graph[i][j] === "." || visited[i][j]) {
      continue;
    }

    visited[i][j] = true;

    let sum = 1;
    const queue = [[i, j]];

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;
        if (graph[dx][dy] === "." || visited[dx][dy]) continue;

        sum++;
        visited[dx][dy] = true;
        queue.push([dx, dy]);
      }
    }

    result = Math.max(result, sum);
  }
}

console.log(result);
