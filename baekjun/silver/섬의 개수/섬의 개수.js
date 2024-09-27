const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));

const nx = [-1, -1, 0, 1, 1, 1, 0, -1];
const ny = [0, 1, 1, 1, 0, -1, -1, -1];

while (input.length > 0) {
  const [w, h] = input.shift();

  if (w === 0 && h === 0) {
    break;
  }

  const land = input.splice(0, h);

  const visited = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => false)
  );

  let sum = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (land[i][j] === 0 || visited[i][j]) {
        continue;
      }

      sum++;
      visited[i][j] = true;

      const queue = [[i, j]];

      while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (let k = 0; k < 8; k++) {
          const dx = x + nx[k];
          const dy = y + ny[k];

          if (dx < 0 || dy < 0 || dx >= h || dy >= w) {
            continue;
          }

          if (land[dx][dy] === 0 || visited[dx][dy]) {
            continue;
          }

          visited[dx][dy] = true;
          queue.push([dx, dy]);
        }
      }
    }
  }

  console.log(sum);
}
