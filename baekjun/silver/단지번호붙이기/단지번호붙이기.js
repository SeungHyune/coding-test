const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());
const arr = input.map((a) => a.split("").map(Number));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

let total = 0;
let totalArray = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 0) continue;
    let count = 1;
    total++;
    arr[i][j] = 0;

    const queue = [[i, j]];
    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= N || dy >= N) continue;

        if (arr[dx][dy] === 0) continue;

        arr[dx][dy] = 0;
        count++;
        queue.push([dx, dy]);
      }
    }

    totalArray.push(count);
  }
}

if (total === 0) {
  console.log(total);
  console.log(0);
} else {
  console.log(total);
  console.log(totalArray.sort((a, b) => a - b).join("\n"));
}
