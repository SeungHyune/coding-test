const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (const [x, y] of arr) {
  graph[x].push(y);
  graph[y].push(x);
}

const visited = Array.from({ length: N + 1 }, () => false);
visited[1] = true;

const queue = [[1, 0]];

let answer = Infinity;

while (queue.length > 0) {
  const [current, count] = queue.shift();

  if (current === N) {
    answer = count;
    break;
  }

  for (let k = 0; k < graph[current].length; k++) {
    const next = graph[current][k];

    if (visited[next]) continue;

    visited[next] = true;
    queue.push([next, count + 1]);
  }
}

const result = answer === Infinity ? -1 : answer;
console.log(result);
