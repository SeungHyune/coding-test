const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[row, col], ...arr] = input.map((v) => v.split(" ").map(Number));
const dy = [-1, 0, 1];

function solution(row, col, arr) {
  let answer = Number.MAX_SAFE_INTEGER;

  const visited = Array.from({ length: row }, () =>
    Array.from({ length: col }, () => Array(3).fill(1000))
  );

  for (let i = 0; i < col; i++) {
    const queue = [[0, i]];
    while (queue.length > 0) {
      const [x, y, d] = queue.shift();

      for (let k = 0; k < 3; k++) {
        const nx = x + 1;
        const ny = y + dy[k];

        // 좌표를 벗어난 경우
        if (nx >= row || ny < 0 || ny >= col) continue;

        // 같은 방향을 연속으로 이동하려는 경우
        if (d === k) continue;

        if (visited[nx][ny][k] === 1000) {
          // 아직 한번도 방문하지 않는 경우
          if (x === 0) visited[nx][ny][k] = arr[x][y] + arr[nx][ny];
          else visited[nx][ny][k] = visited[x][y][d] + arr[nx][ny];

          queue.push([nx, ny, k]);
        } else if (visited[nx][ny][k] >= visited[x][y][d] + arr[nx][ny]) {
          // 방문한 경우
          visited[nx][ny][k] = visited[x][y][d] + arr[nx][ny];
          queue.push([nx, ny, k]);
        }
      }
    }
  }
  return Math.min(...visited[visited.length - 1].flatMap((v) => v));
}

console.log(solution(row, col, arr));
