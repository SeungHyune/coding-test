const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
const result = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => -1)
);

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 0) {
      result[i][j] = 0;
      continue;
    }
    if (visited[i][j] || arr[i][j] === 1) continue;

    visited[i][j] = true;
    result[i][j] = 0;
    const queue = [[i, j, 0]];

    while (queue.length > 0) {
      const [x, y, l] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;

        if (visited[dx][dy] || arr[dx][dy] === 0) continue;

        result[dx][dy] = l + 1;
        visited[dx][dy] = true;

        queue.push([dx, dy, l + 1]);
      }
    }
  }
}

console.log(result.join("\n").split(",").join(" "));
