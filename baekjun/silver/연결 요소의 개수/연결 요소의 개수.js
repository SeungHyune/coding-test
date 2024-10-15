const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(" ").map(Number));

let node = 0;
const graph = Array.from({ length: N }, () => []);

for (const [x, y] of arr) {
  graph[x - 1].push(y - 1);
  graph[y - 1].push(x - 1);
}

const visited = Array.from({ length: N }, () => false);
for (let i = 0; i < N; i++) {
  if (visited[i]) {
    continue;
  }

  node++;
  visited[i] = true;

  const queue = [i];

  while (queue.length > 0) {
    const next = queue.shift();

    for (let k = 0; k < graph[next].length; k++) {
      const nextIndex = graph[next][k];

      if (visited[nextIndex]) {
        continue;
      }

      visited[nextIndex] = true;
      queue.push(nextIndex);
    }
  }
}

console.log(node);
