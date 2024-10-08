// 이중 for문을 통해서 [0][0] 지점부터 탐색하며 이미 방문했거나 울타리인 경우 패스한다.
// 만약 양 혹은 늑대라면 현재 울타리 안을 상하좌우 탐색하며 양과 늑대의 수를 파악한다.
// 이때 양의 수가 더 많다면 전체 양의 수에서 현재 탐색된 양의 수를 더해준다.
// 양이 늑대의 수보다 작거나 같다면 저체 늑대의 수에서 현재 탐색된 늑대의 수를 더해준다.

// 이렇게 최종 지점까지 탐색한 후 양과 늑대의 수를 출력하면 문제를 해결할 수 있다.

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

let [sheep, wolf] = [0, 0];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] || arr[i][j] === "#") {
      continue;
    }

    visited[i][j] = true;

    let [s, w] = [0, 0];

    if (arr[i][j] === "v") {
      w++;
    } else if (arr[i][j] === "k") {
      s++;
    }

    const queue = [[i, j]];

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= N || dy >= M) {
          continue;
        }

        if (visited[dx][dy] || arr[dx][dy] === "#") {
          continue;
        }

        if (arr[dx][dy] === "v") {
          w++;
        } else if (arr[dx][dy] === "k") {
          s++;
        }

        visited[dx][dy] = true;

        queue.push([dx, dy]);
      }
    }

    if (s <= w) {
      wolf += w;
    } else {
      sheep += s;
    }
  }
}

console.log(sheep, wolf);
