const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [M], ...arr] = input.map((a) => a.split(" ").map(Number));

const virus = Array.from({ length: N }, () => []);
const visited = Array.from({ length: N }, () => false);
visited[0] = true;

for (const [x, y] of arr) {
  virus[x - 1].push(y - 1);
  virus[y - 1].push(x - 1);
}

const queue = [0];

while (queue.length > 0) {
  const next = queue.shift();

  for (let k = 0; k < virus[next].length; k++) {
    const nextComputer = virus[next][k];

    if (visited[nextComputer]) {
      continue;
    }

    visited[nextComputer] = true;
    queue.push(nextComputer);
  }
}

visited[0] = false;

const result = visited.filter((virus) => virus).length;
console.log(result);
