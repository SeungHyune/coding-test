const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((a) => a.split(""));

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // 이미 체크된 바닥
    if (visited[i][j]) {
      continue;
    }

    answer++;
    visited[i][j] = true;

    const tail = arr[i][j];
    const queue = [[i, j, tail]];

    while (queue.length > 0) {
      const [x, y, tail] = queue.shift();

      if (tail === "-" && y + 1 < M) {
        if (visited[x][y + 1]) continue;
        if (arr[x][y + 1] === tail) {
          queue.push([x, y + 1, tail]);
          visited[x][y + 1] = true;
        }
      } else if (tail === "|" && x + 1 < N) {
        if (visited[x + 1][y]) continue;
        if (arr[x + 1][y] === tail) {
          queue.push([x + 1, y, tail]);
          visited[x + 1][y] = true;
        }
      }
    }
  }
}

console.log(answer);
