const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const nx = [0, 1];
const ny = [1, 0];

const visited = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => false)
);
visited[0][0] = true;

const queue = [[0, 0]];

while (queue.length > 0) {
  const [x, y] = queue.shift();

  for (let k = 0; k < 2; k++) {
    const dx = x + nx[k];
    const dy = y + ny[k];

    if (dx >= M || dy >= N) continue;
    if (arr[dx][dy] === 0 || visited[dx][dy]) continue;

    visited[dx][dy] = true;
    queue.push([dx, dy]);
  }
}

if (visited[M - 1][N - 1]) {
  console.log("Yes");
} else {
  console.log("No");
}
