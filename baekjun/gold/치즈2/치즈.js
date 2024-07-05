// N은 세로 격자의 수, M은 가로 격자의 수
// 치즈는 바깥 공기와 통하는 방향이 2번 이상 있는 경우 이 치즈는 한시간만에 녹아 없어져 버린다.
// 내부 공간의 경우 외부 공기와 접촉하지 않는 것으로 가정한다.

// 모눈종이의 맨 가장자리에는 치즈가 놓이지 않는 것으로 가정한다.
// 입력으로 주어진 치즈가 모두 녹아 없어지는데 걸리는 정확한 시간을 구하는 프로그램을 작성하시오.

// 치즈가 있는 부분 - 1 / 치즈가 없는 부분 - 0

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

let result = 0;
let cheese = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 1) {
      cheese++;
    }
  }
}

while (cheese > 0) {
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  visited[0][0] = true;

  const queue = [[0, 0]];

  let index = 0;
  while (queue.length > index) {
    const [x, y] = queue[index++];

    for (let k = 0; k < 4; k++) {
      const dx = x + nx[k];
      const dy = y + ny[k];

      if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;
      if (visited[dx][dy]) continue;
      if (arr[dx][dy] >= 1) {
        arr[dx][dy]++;
        continue;
      }

      visited[dx][dy] = true;
      queue.push([dx, dy]);
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 0) continue;

      let flag = false;

      if (arr[i][j] >= 3) {
        arr[i][j] = 0;
        flag = true;
        cheese--;
      }

      if (flag === false) {
        arr[i][j] = 1;
      }
    }
  }

  result++;
}

console.log(result);
