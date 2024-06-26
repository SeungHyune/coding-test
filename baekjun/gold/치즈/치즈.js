const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
let map = input.map((a) => a.split(" ").map(Number));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let cheeseLength = findCheeseLength();
let lastPrevCheeseLength = cheeseLength;

const cheeseLengthArray = [cheeseLength];
let hour = 0;

function findCheeseLength() {
  let cheeseLength = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1) {
        cheeseLength++;
      }
    }
  }

  return cheeseLength;
}

function findRemoveCheese() {
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );

  const queue = [[0, 0]];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M || visited[nx][ny]) continue;

      if (map[nx][ny] === 1) {
        map[nx][ny] += 1;
      }

      if (map[nx][ny] === 0) {
        queue.push([nx, ny]);
      }

      visited[nx][ny] = true;
    }
  }

  let removeCheese = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] >= 2) {
        map[i][j] = 0;
        cheeseLength--;
        removeCheese++;
      }
    }
  }

  return removeCheese;
}

while (cheeseLength > 0) {
  hour++;
  lastPrevCheeseLength = findRemoveCheese();
}

console.log(hour);
console.log(lastPrevCheeseLength);
