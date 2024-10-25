const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: N }, () => []);

for (const [x, y] of arr) {
  graph[x - 1].push(y - 1);
  graph[y - 1].push(x - 1);
}

const visited = Array.from({ length: N }, () => 0);
visited[0] = 1;

const queue = [[0, 1]];

while (queue.length > 0) {
  const [current, distance] = queue.shift();

  for (let k = 0; k < graph[current].length; k++) {
    const next = graph[current][k];

    if (visited[next] === 0) {
      visited[next] = distance + 1;

      queue.push([next, distance + 1]);
    }
  }
}

let [distance, dArr] = [0, []];

for (let i = 0; i < N; i++) {
  const d = visited[i];

  if (distance === d) {
    dArr.push(i + 1);
  } else if (distance < d) {
    distance = d;
    dArr = [i + 1];
  }
}

console.log(dArr[0], distance - 1, dArr.length);
