const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

let answer = 0;

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === "I") {
      visited[i][j] = true;

      const queue = [[i, j]];

      while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (let k = 0; k < 4; k++) {
          const dx = x + nx[k];
          const dy = y + ny[k];

          if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;

          if (arr[dx][dy] === "X" || visited[dx][dy]) continue;

          if (arr[dx][dy] === "P") answer++;
          visited[dx][dy] = true;
          queue.push([dx, dy]);
        }
      }
    }
  }
}

console.log(answer ? answer : "TT");
