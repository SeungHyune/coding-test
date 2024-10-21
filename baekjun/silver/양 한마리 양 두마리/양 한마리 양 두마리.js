const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = input.shift();

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

while (N--) {
  const [H, W] = input.shift().split(" ").map(Number);

  const arr = input.splice(0, H).map((a) => a.split(""));
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => false)
  );

  let sheep = 0;

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (arr[i][j] === "." || visited[i][j]) {
        continue;
      }

      sheep++;
      visited[i][j] = true;

      const queue = [[i, j]];

      while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (let k = 0; k < 4; k++) {
          const dx = x + nx[k];
          const dy = y + ny[k];

          if (dx < 0 || dy < 0 || dx >= H || dy >= W) {
            continue;
          }

          if (arr[dx][dy] === "." || visited[dx][dy]) {
            continue;
          }

          visited[dx][dy] = true;
          queue.push([dx, dy]);
        }
      }
    }
  }

  console.log(sheep);
}
