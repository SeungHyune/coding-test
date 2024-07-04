// 승원이가 연구소에 바이러스를 유출하려고 한다.
// 승원이는 연구소의 특정 위치에 바이러스 M개를 놓을 것이고, 신호와 동시에 바이러스는 퍼진다.

// 연구소는 N*N 정사각형으로 나타낼 수 있으며, 연구소는 빈 칸, 벽으로 이루어져 있다.
// 빈 칸은 바이러스를 놓을 수 있는 칸이다. 바이러스는 상하좌우로 빈 칸으로 퍼져 나가며 1초가 걸린다.

// 0은 빈 칸, 1은 벽, 2는 바이러스를 놓을 수 있는 칸이다.
// M은 바이러스의 개수이다 바이러스를 연구소에 놓고 바이러스가 모든 연구소에 퍼져 나가는 최소 시간을 구해라

// 만약 연구소 모두 바이러스를 퍼뜨릴 수 없는 경우에는 -1을 출력한다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

let result = Infinity;
const virus = [];

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 2) {
      virus.push([i, j]);
      arr[i][j] = 0;
    } else if (arr[i][j] === 1) {
      arr[i][j] = -2;
    }
  }
}

const virusLength = virus.length;
const virusChecker = Array.from({ virusLength }, () => false);

function dfs(L, array, prevL, prevR) {
  if (L === M) {
    result = Math.min(result, bfs(array));
  } else {
    for (let i = 0; i < virusLength; i++) {
      if (virusChecker[i]) continue;
      if (virus[i][0] < prevL) continue;
      if (virus[i][0] === prevL && virus[i][1] < prevR) continue;

      virusChecker[i] = true;
      dfs(L + 1, [...array, virus[i]], virus[i][0], virus[i][1]);
      virusChecker[i] = false;
    }
  }
}

dfs(0, [], virus[0][0], virus[0][1]);

function bfs(virusLocation) {
  const visited = JSON.parse(JSON.stringify(arr));

  const queue = [];

  for (const [x, y] of virusLocation) {
    visited[x][y] = -1;
    queue.push([x, y, 0]);
  }

  let index = 0;

  while (queue.length > index) {
    const [x, y, t] = queue[index++];

    for (let k = 0; k < 4; k++) {
      const dx = x + nx[k];
      const dy = y + ny[k];

      if (dx < 0 || dy < 0 || dx >= N || dy >= N) continue;
      if (visited[dx][dy] === -2 || visited[dx][dy] === -1) continue;

      if (visited[dx][dy] === 0 || visited[dx][dy] > t + 1) {
        visited[dx][dy] = t + 1;
        queue.push([dx, dy, t + 1]);
      }
    }
  }

  const visitedFlat = visited.flatMap((a) => a);
  const check = visitedFlat.some((a) => a === 0);

  const time = Math.max(...visitedFlat);

  if (check === false) {
    if (time === -1) {
      return 0;
    }
    return time;
  } else {
    return Infinity;
  }
}

result === Infinity ? console.log(-1) : console.log(result);
