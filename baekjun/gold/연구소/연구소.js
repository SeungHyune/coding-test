// 인체에 치명적인 바이러스가 연구소에서 유출되었다.
// 바이러스는 아직 퍼지지 않아, 바이러스 확산을 막기 위해 연구소에 벽을 세우려고 한다.
// 연구소는 NxM인 크기의 직사각형이다.
// 연구소는 빈칸, 벽으로 이루어져 있으며, 벽은 칸 하나를 가득 차지한다.
// 일부 칸은 바이러스가 존재하며, 이 바이러스는 상하좌우로 인접한 빈칸으로 모두 퍼져나갈 수 있다.
// 새로 세울 수 있는 벽의 개수는 3개이며, 꼭 3개를 세워야 한다.

// 0은 빈칸, 1은 벽, 2는 바이러스가 있는 곳이다.
// 벽을 세운 뒤 바이러스가 퍼질 수 없는 곳을 안전 영역이라고 한다.
// 벽을 세운 뒤 최대한 많은 안전 영역의 크기를 구하는 프로그램을 작성해라

// 랜덤 한 세 곳에 벽을 세운다.
// 안전 영역을 탐색한다.
// 만약 안전 영역이 이전에 구한 수 보다 크다면 갱신한다.
// 최댓값을 출력한다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let result = 0;
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
const paths = new Set();

function dfs(L, array) {
  if (L === 3) {
    const path = array
      .map(([x, y]) => `${x}${y}`)
      .sort()
      .join(",");

    if (paths.has(path)) {
      return;
    }

    for (const [x, y] of array) {
      if (arr[x][y] === 1 || arr[x][y] === 2) {
        return;
      }
    }

    paths.add(path);
    bfs(array);

    return;
  } else {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (visited[i][j]) continue;

        visited[i][j] = true;
        dfs(L + 1, [...array, [i, j]]);
        visited[i][j] = false;
      }
    }
  }
}

dfs(0, []);

function bfs(virus) {
  for (const [x, y] of virus) {
    arr[x][y] = 1;
  }

  const copy = JSON.parse(JSON.stringify(arr));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 1 || copy[i][j] === 0) {
        continue;
      }

      const queue = [[i, j]];

      let index = 0;

      while (queue.length > index) {
        const [x, y] = queue[index++];

        for (let k = 0; k < 4; k++) {
          const nx = x + dx[k];
          const ny = y + dy[k];

          if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

          if (copy[nx][ny] === 1 || copy[nx][ny] === 2) continue;

          copy[nx][ny] = 2;
          queue.push([nx, ny]);
        }
      }
    }
  }

  const safeArea = copy.flatMap((a) => a).filter((num) => num === 0).length;

  result = Math.max(result, safeArea);

  for (const [x, y] of virus) {
    arr[x][y] = 0;
  }
}

console.log(result);
