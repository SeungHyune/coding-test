const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split("").map(Number));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Infinity)
);
visited[0][0] = 1;

const queue = [[0, 0]];

while (queue.length > 0) {
  const [x, y] = queue.shift();

  for (let k = 0; k < 4; k++) {
    const dx = x + nx[k];
    const dy = y + ny[k];

    if (dx < 0 || dx >= N || dy < 0 || dy >= M) continue;

    if (arr[dx][dy] === 0) continue;

    if (visited[dx][dy] <= visited[x][y] + 1) continue;

    visited[dx][dy] = visited[x][y] + 1;
    queue.push([dx, dy]);
  }
}

console.log(visited[N - 1][M - 1]);
