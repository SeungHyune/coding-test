const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = 1;
const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const numberList = new Set(arr.flatMap((a) => a).sort((a, b) => a - b));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

for (const num of numberList) {
  let result = 0;
  const checker = JSON.parse(JSON.stringify(arr));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (checker[i][j] <= num) continue;

      result++;

      checker[i][j] = 0;
      const queue = [[i, j]];

      let index = 0;

      while (index < queue.length) {
        const [x, y] = queue[index++];

        for (let k = 0; k < 4; k++) {
          const dx = x + nx[k];
          const dy = y + ny[k];

          if (dx < 0 || dy < 0 || dx >= N || dy >= N) continue;

          if (checker[dx][dy] <= num) continue;

          checker[dx][dy] = 0;
          queue.push([dx, dy]);
        }
      }
    }
  }

  answer = Math.max(answer, result);
}

console.log(answer);
