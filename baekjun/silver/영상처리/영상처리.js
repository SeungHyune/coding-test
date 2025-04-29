const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = Number(input.pop());

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const newArr = [];

for (let i = 0; i < arr.length; i++) {
  const array = [];
  let sum = 0;

  for (let j = 0; j < arr[0].length; j++) {
    sum += arr[i][j];

    if ((j + 1) % 3 === 0) {
      const a = sum / 3;

      if (a >= T) {
        array.push(255);
      } else {
        array.push(0);
      }

      sum = 0;
    }
  }

  newArr.push(array);
}

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] || newArr[i][j] === 0) continue;

    visited[i][j] = true;

    answer++;

    const queue = [[i, j]];

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;
        if (visited[dx][dy]) continue;
        if (newArr[dx][dy] === 0) continue;

        visited[dx][dy] = true;
        queue.push([dx, dy]);
      }
    }
  }
}

console.log(answer);
