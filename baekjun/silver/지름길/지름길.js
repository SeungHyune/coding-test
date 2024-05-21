const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));

const [N, D] = input.shift();
const visited = Array.from({ length: D + 1 }, (_, idx) => idx);

const graph = {};

for (const [x, y, d] of input) {
  if (graph[x]) {
    graph[x].push([y, d]);
  } else {
    graph[x] = [[y, d]];
  }
}

for (let i = 0; i <= D; i++) {
  if (i > 0) {
    visited[i] = Math.min(visited[i], visited[i - 1] + 1);
  }

  if (graph[i]) {
    for (let j = 0; j < graph[i].length; j++) {
      const [next, distance] = graph[i][j];
      visited[next] = Math.min(visited[next], visited[i] + distance);
    }
  }
}

console.log(visited[D]);
