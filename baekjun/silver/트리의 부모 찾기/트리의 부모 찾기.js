const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: N }, () => []);
const visited = Array.from({ length: N }, () => 0);
visited[0] = true;

for (const [x, y] of arr) {
  graph[x - 1].push(y - 1);
  graph[y - 1].push(x - 1);
}

const queue = [0];
while (queue.length > 0) {
  const current = queue.shift();

  for (let k = 0; k < graph[current].length; k++) {
    const next = graph[current][k];

    if (visited[next] > 0 || next === 0) continue;

    visited[next] = current + 1;
    queue.push(next);
  }
}

visited.shift();
console.log(visited.join("\n"));
