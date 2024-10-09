const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [R, C, K] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);
visited[R - 1][0] = true;

const queue = [[R - 1, 0, 1, visited]];

let result = 0;

while (queue.length > 0) {
  const [x, y, count, visited] = queue.shift();

  if (x === 0 && y === C - 1) {
    if (count === K) {
      result++;
    }

    continue;
  }

  for (let k = 0; k < 4; k++) {
    const dx = x + nx[k];
    const dy = y + ny[k];

    if (dx < 0 || dy < 0 || dx >= R || dy >= C) {
      continue;
    }

    const newVisited = JSON.parse(JSON.stringify(visited));

    if (newVisited[dx][dy] || arr[dx][dy] === "T") {
      continue;
    }

    newVisited[dx][dy] = true;

    queue.push([dx, dy, count + 1, newVisited]);
  }
}

console.log(result);
