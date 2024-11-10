const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [M], ...arr] = input.map((a) => a.split(" ").map(Number));

const visited = Array.from({ length: N }, () => false);
const graph = Array.from({ length: N }, () => []);

for (const [x, y] of arr) {
  graph[x - 1].push(y - 1);
  graph[y - 1].push(x - 1);
}

visited[0] = true;

const queue = [[0, 0]];

while (queue.length > 0) {
  const [current, depth] = queue.shift();

  for (let k = 0; k < graph[current].length; k++) {
    const next = graph[current][k];

    if (visited[next] || depth >= 2) continue;

    visited[next] = true;
    queue.push([next, depth + 1]);
  }
}

visited[0] = false;

const result = visited.filter((visit) => visit).length;
console.log(result);
