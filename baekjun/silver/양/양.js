const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

const visited = Array.from({ length: R }, () => Array.from({ C }, () => false));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

let [sheep, wolf] = [0, 0];

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (arr[i][j] === "#" || visited[i][j]) {
      continue;
    }

    let [s, w] = [0, 0];
    visited[i][j] = true;

    if (arr[i][j] === "o") {
      s++;
    } else if (arr[i][j] === "v") {
      w++;
    }

    const queue = [[i, j]];

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= R || dy >= C) {
          continue;
        }

        if (arr[dx][dy] === "#" || visited[dx][dy]) {
          continue;
        }

        if (arr[dx][dy] === "o") {
          s++;
        } else if (arr[dx][dy] === "v") {
          w++;
        }

        visited[dx][dy] = true;
        queue.push([dx, dy]);
      }
    }

    if (s > w) {
      sheep += s;
    } else {
      wolf += w;
    }
  }
}

console.log(sheep, wolf);
