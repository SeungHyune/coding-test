const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const dx = [-1, -2, -2, -1, 1, 2, 1, 2];
const dy = [-2, -1, 1, 2, 2, 1, -2, -1];

while (N--) {
  const [L] = arr.shift();
  const [startX, startY] = arr.shift();
  const [endX, endY] = arr.shift();

  const chess = Array.from({ length: L }, () =>
    Array.from({ length: L }, () => false)
  );
  chess[startX][startY] = true;

  const queue = [[startX, startY, 0]];

  while (queue.length > 0) {
    const [x, y, move] = queue.shift();

    if (x === endX && y === endY) {
      console.log(move);
      break;
    }

    for (let k = 0; k < 8; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];

      if (nx < 0 || ny < 0 || nx >= L || ny >= L) continue;

      if (chess[nx][ny]) continue;

      chess[nx][ny] = true;
      queue.push([nx, ny, move + 1]);
    }
  }
}
