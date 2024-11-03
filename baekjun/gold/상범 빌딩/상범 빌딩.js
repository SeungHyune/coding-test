const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const nxx = [0, 0, 0, 0, 1, -1];
const nx = [-1, 0, 1, 0, 0, 0];
const ny = [0, 1, 0, -1, 0, 0];

while (true) {
  const [L, R, C] = input.shift().split(" ").map(Number);

  if (L === 0 && R === 0 && C === 0) {
    return;
  }

  const floors = input.splice(0, R * L + L).map((a) => a.split(""));

  const arr = [];
  let buildingArr = [];

  for (const floor of floors) {
    if (floor.length === 0) {
      arr.push(buildingArr);
      buildingArr = [];
    } else {
      buildingArr.push(floor);
    }
  }

  const visited = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array.from({ length: C }, () => false))
  );

  let flag = false;

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < R; j++) {
      for (let h = 0; h < C; h++) {
        if (arr[i][j][h] === "S") {
          visited[i][j][h] = true;

          const queue = [[i, j, h, 0]];

          while (queue.length > 0) {
            const [xx, x, y, time] = queue.shift();

            for (let k = 0; k < 6; k++) {
              const dxx = xx + nxx[k];
              const dx = x + nx[k];
              const dy = y + ny[k];

              if (dxx < 0 || dxx >= L || dx < 0 || dy < 0 || dx >= R || dy >= C)
                continue;

              if (visited[dxx][dx][dy] || arr[dxx][dx][dy] === "#") continue;

              if (arr[dxx][dx][dy] === "E") {
                visited[dxx][dx][dy] = true;
                flag = true;
                console.log(`Escaped in ${time + 1} minute(s).`);
                break;
              }

              visited[dxx][dx][dy] = true;
              queue.push([dxx, dx, dy, time + 1]);
            }
          }
        }
      }
    }
  }

  if (flag === false) {
    console.log("Trapped!");
  }
}
