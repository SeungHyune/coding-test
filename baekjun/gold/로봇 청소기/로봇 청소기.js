const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let [N, M] = input.shift().split(" ").map(Number);
let [x, y, d] = input.shift().split(" ").map(Number);
let arr = input.map((a) => a.split(" ").map(Number));

let cleaning = 0;

const queue = [[x, y, d]];
while (queue.length > 0) {
  let [x, y, d] = queue.shift();

  if (arr[x][y] === 0) {
    // 빈 칸
    cleaning++;
    arr[x][y] = 2;
  }

  let check = 0;

  for (let k = 0; k < 4; k++) {
    const nx = x + dx[k];
    const ny = y + dy[k];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

    if (arr[nx][ny] === 0) {
      check++;
    }
  }

  if (check === 0) {
    // 주변 4칸 중 빈 칸이 없는 경우
    const nx = x - dx[d];
    const ny = y - dy[d];

    if (arr[nx][ny] === 1 || nx < 0 || ny < 0 || nx >= N || ny >= M) break;
    else {
      queue.push([nx, ny, d]);
    }
  }

  let i = 4;
  while (i-- > 0) {
    // 주변 4칸 중 빈 칸이 있는 경우
    d -= 1;
    if (d === -1) d = 3;

    const nx = x + dx[d];
    const ny = y + dy[d];

    if (arr[nx][ny] === 0) {
      queue.push([nx, ny, d]);
      break;
    }
  }
}

console.log(cleaning);
