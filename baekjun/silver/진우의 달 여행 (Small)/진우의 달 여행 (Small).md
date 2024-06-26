# **진우의 달 여행 (Small)**

[문제 링크](https://www.acmicpc.net/problem/17484)

### 문제설명

우주비행이 꿈이였던 진우는 음식점 '매일매일싱싱'에서 열심히 일한 결과 달 여행에 필요한 자금을 모두 마련하였다! 지구와 우주사이는 N X M 행렬로 나타낼 수 있으며 각 원소의 값은 우주선이 그 공간을 지날 때 소모되는 연료의 양이다.

[예시]

https://upload.acmicpc.net/9e155c65-43ea-492b-af73-d3f9f9c9dc44/-/preview/

진우는 여행경비를 아끼기 위해 조금 특이한 우주선을 선택하였다. 진우가 선택한 우주선의 특징은 아래와 같다.

**1. 지구 -> 달로 가는 경우 우주선이 움직일 수 있는 방향은 아래와 같다.**

https://upload.acmicpc.net/8f6fc516-9870-4ef6-8474-b5d82f7b6f21/-/preview/

https://upload.acmicpc.net/eb6f87f0-f4d0-43cc-8e9d-5d94bfc41936/-/preview/

https://upload.acmicpc.net/e7b501aa-c92c-4a17-aed7-c7868b89af7a/-/preview/

**2. 우주선은 전에 움직인 방향으로 움직일 수 없다. 즉, 같은 방향으로 두번 연속으로 움직일 수 없다.**

진우의 목표는 **연료를 최대한 아끼며 지구의 어느위치에서든 출발하여 달의 어느위치든 착륙하는 것**이다.

최대한 돈을 아끼고 살아서 달에 도착하고 싶은 진우를 위해 달에 도달하기 위해 필요한 연료의 최소값을 계산해 주자.

<br>

### 입력

첫줄에 지구와 달 사이 공간을 나타내는 행렬의 크기를 나타내는 N, M (2≤ N, M ≤ 6)이 주어진다.

다음 N줄 동안 각 행렬의 원소 값이 주어진다. 각 행렬의 원소값은 100 이하의 자연수이다.

<br>

### 출력

달 여행에 필요한 최소 연료의 값을 출력한다.

<br>

### 예제 1

```jsx
// 예제 1
6 4
5 8 5 1
3 5 8 4
9 77 65 5
2 1 5 2
5 98 1 5
4 95 67 58

// 예제 출력 1
29
```

<br>

### 📕 문제 포인트

1. 지구에서 달까지 이동하며 가장 적은 연로로 이동할 수 있는 거리를 구하는 문제입니다.
2. 이때 같은 방향으로 두 번 연속으로 이동할 수 없습니다.
3. 이동 가능한 방향은 `세로 + 1 / 가로 - 1` , `세로 + 1 / 가로 - 0` , `세로 + 1 / 가로 + 1` 입니다.

### 1차 문제풀이 (실패)

```jsx
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[row, col], ...arr] = input.map((v) => v.split(" ").map(Number));
const dy = [-1, 0, 1];

function solution(row, col, arr) {
  let answer = 600;
  const array = [...arr[0]];

  for (let i = 0; i < 1; i++) {
    const visited = Array.from({ length: row - 1 }, () =>
      Array(col).fill(1000)
    );
    visited.unshift(array);
    for (let j = 0; j < col; j++) {
      const queue = [[i, j]];
      while (queue.length > 0) {
        const [x, y, d] = queue.shift();

        for (let k = 0; k < 3; k++) {
          const nx = x + 1;
          const ny = y + dy[k];

          // 좌표를 벗어난 경우
          if (ny < 0 || nx >= row || ny >= col) continue;

          // 같은 위치로 이동하는 경우
          if (d === k) {
            continue;
          }

          if (visited[nx][ny] === 1000) {
            visited[nx][ny] = visited[x][y] + arr[nx][ny];
            queue.push([nx, ny, k]);
          } else if (visited[nx][ny] >= visited[x][y] + arr[nx][ny]) {
            visited[nx][ny] = visited[x][y] + arr[nx][ny];
            queue.push([nx, ny, k]);
          }
        }
      }
      console.log(visited);
      answer = Math.min(answer, ...visited[visited.length - 1]);
    }
  }

  return answer;
}

console.log(solution(row, col, arr));
```

### 2차 문제풀이

```js
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
```
