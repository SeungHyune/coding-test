const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [R, C] = input.pop().split(" ").map(Number);
const arr = input.map((a) => a.split(" ").map(Number));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const visited = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => false)
);

const queue = [[R, C, 0]];
visited[R][C] = true;

while (queue.length > 0) {
  const [x, y, count] = queue.shift();

  if (arr[x][y] === 1) {
    console.log(count);
    return;
  }

  for (let k = 0; k < 4; k++) {
    const dx = x + nx[k];
    const dy = y + ny[k];

    if (dx < 0 || dy < 0 || dx > 4 || dy > 4) {
      continue;
    }
    if (visited[dx][dy]) {
      continue;
    }
    if (arr[dx][dy] === -1) {
      continue;
    }

    visited[dx][dy] = true;
    queue.push([dx, dy, count + 1]);
  }
}

console.log(-1);
