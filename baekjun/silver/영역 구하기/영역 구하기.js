const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[M, N, K], ...arr] = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => 0)
);

for (const [x1, y1, x2, y2] of arr) {
  for (let i = y1; i < y2; i++) {
    for (let j = x1; j < x2; j++) {
      graph[i][j] = 1;
    }
  }
}

const visited = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => false)
);

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let total = 0;
const totalArray = [];

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (graph[i][j] === 1 || visited[i][j]) {
      continue;
    }

    total++;
    visited[i][j] = true;

    const queue = [[i, j]];

    let sum = 1;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const nx = x + dx[k];
        const ny = y + dy[k];

        if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
          continue;
        }

        if (graph[nx][ny] === 1 || visited[nx][ny]) {
          continue;
        }

        visited[nx][ny] = true;
        sum++;

        queue.push([nx, ny]);
      }
    }

    totalArray.push(sum);
  }
}

console.log(total);
console.log(totalArray.sort((a, b) => a - b).join(" "));
