const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const current = input.pop() - 1;
const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

const visited = Array.from({ length: N }, () => false);
visited[current] = true;

const queue = [current];

while (queue.length > 0) {
  const current = queue.shift();

  const move = arr[current];

  for (const next of [current + move, current - move]) {
    if (next >= N || next < 0) continue;
    if (visited[next]) continue;

    visited[next] = true;
    queue.push(next);
  }
}

const result = visited.filter((v) => v).length;
console.log(result);
