const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split("").map(Number));

let answer = "NO";

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

for (let i = 0; i < 1; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 1) continue;

    const queue = [[i, j]];

    visited[i][j] = true;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (x + 1 === N) {
        answer = "YES";
        return console.log(answer);
      }

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;

        if (visited[dx][dy] || arr[dx][dy] === 1) continue;

        visited[dx][dy] = true;
        queue.push([dx, dy]);
      }
    }
  }
}

console.log(answer);
