// 빈 방은 이동가능, 벽은 부숴야 이동가능
// 운영진 여러명은 항상 모두 같은 방에 있어야 한다.
// 상하좌우로 인접한 빈 방으로 이동할 수 있다.
// 벽은 평소에 이동할 수 없지만, 알고스팟의 무기 AOJ를 이용해 벽을 부시면 빈 방과 동일한 방으로 변한다.
// (1,1)에 있는 운영진이 (N,M)으로 이동하려면 벽을 몇 개 부셔야 하는지 구하라
// 0은 빈방을 1은 벽을 나타낸다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [M, N] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split("").map(Number));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Infinity)
);
visited[0][0] = 0;

const queue = [[0, 0]];

let index = 0;
while (queue.length > index) {
  const [x, y] = queue[index++];

  for (let k = 0; k < 4; k++) {
    const dx = x + nx[k];
    const dy = y + ny[k];

    if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;

    if (arr[dx][dy] === 1 && visited[dx][dy] > visited[x][y] + 1) {
      visited[dx][dy] = visited[x][y] + 1;
      queue.push([dx, dy]);
    }

    if (arr[dx][dy] === 0 && visited[dx][dy] > visited[x][y]) {
      visited[dx][dy] = visited[x][y];
      queue.push([dx, dy]);
    }
  }
}

console.log(visited[N - 1][M - 1]);
