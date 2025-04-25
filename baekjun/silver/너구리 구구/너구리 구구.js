const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < input.length; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

let max = 0;
const visited = Array(n + 1).fill(false);

function dfs(node, sum) {
  visited[node] = true;
  max = Math.max(max, sum);

  for (const [next, cost] of graph[node]) {
    if (!visited[next]) {
      dfs(next, sum + cost);
    }
  }

  return sum;
}

dfs(1, 0);

console.log(max);
