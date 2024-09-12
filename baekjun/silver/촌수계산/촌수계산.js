const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [A, B], [M], ...arr] = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: N }, () => []);
const visited = Array.from({ length: N }, () => false);

for (const [x, y] of arr) {
  graph[x - 1].push(y - 1);
  graph[y - 1].push(x - 1);
}

const queue = [[A - 1, B - 1, 0]];
visited[A - 1] = true;

while (queue.length > 0) {
  const [start, end, index] = queue.shift();

  for (let k = 0; k < graph[start].length; k++) {
    const next = graph[start][k];
    if (visited[next]) continue;

    if (next === end) {
      return console.log(index + 1);
    }

    visited[next] = true;
    queue.push([next, end, index + 1]);
  }
}

console.log(-1);
