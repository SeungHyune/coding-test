const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, K, X] = input.shift().split(" ").map(Number);
input = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
for (const [x, y] of input) {
  graph[x].push(y);
}

function solution() {
  const visited = Array.from({ length: N + 1 }, () => 0);
  const queue = [[X, 0]];

  let index = 0;
  while (queue.length > index) {
    const [next, depth] = queue[index++];

    for (let k = 0; k < graph[next].length; k++) {
      const nextCity = graph[next][k];

      if (visited[nextCity] === 0) {
        visited[nextCity] = depth + 1;
        queue.push([nextCity, depth + 1]);
      } else {
        if (visited[nextCity] > depth + 1) {
          visited[nextCity] = depth + 1;
          queue.push([nextCity, depth + 1]);
        }
      }
    }
  }

  const result = [];

  for (let i = 1; i <= N; i++) {
    if (visited[i] === K && i !== X) {
      result.push(i);
    }
  }

  if (result.length === 0) return -1;
  return result.join("\n");
}

console.log(solution());
