# **RGB거리**

[문제 링크](https://www.acmicpc.net/problem/1149)

### 문제설명

RGB거리에는 집이 N개 있다. 거리는 선분으로 나타낼 수 있고, 1번 집부터 N번 집이 순서대로 있다.

집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다. 각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.

- 1번 집의 색은 2번 집의 색과 같지 않아야 한다.
- N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
- i(2 ≤ i ≤ N-1)번 집의 색은 i-1번, i+1번 집의 색과 같지 않아야 한다.

<br>

### 입력

첫째 줄에 집의 수 N(2 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 각 집을 빨강, 초록, 파랑으로 칠하는 비용이 1번 집부터 한 줄에 하나씩 주어진다. 집을 칠하는 비용은 1,000보다 작거나 같은 자연수이다.

<br>

### 출력

첫째 줄에 모든 집을 칠하는 비용의 최솟값을 출력한다.

<br>

### 예제 1

```jsx
// 예제 1
3
26 40 83
49 60 57
13 89 99

// 예제 출력 2
96
```

<br>

### 📕 문제 포인트

1. 현재 색상은 이전 색상 값과 달라야 하고 이동하는 색상 값과 달라야 합니다.
2. 1부터 N-1까지 반복하며 순회합니다. (현재 색상과 이전 색상 값을 비교하여 현재 색상이 아닌 값과 더하여 최솟값을 현재 위치에 저장합니다.)

   ex) R(0), G(1), B(2)

   현재 위치가 `R`라면

   - dp[i][0] = dp[i][0] + Math.min(dp[i-1][1], dp[i-1][2]) 를 통해 최솟값을 구할 수 있습니다.

   현재 위치가 `G`라면

   - dp[i][1] = dp[i][1] + Math.min(dp[i-1][0], dp[i-1][2]) 를 통해 최솟값을 구할 수 있습니다.

   현재 위치가 `B`라면

   - dp[i][2] = dp[i][2] + Math.min(dp[i-1][0], dp[i-1][1]) 를 통해 최솟값을 구할 수 있습니다.

### 1차 풀이 (45%에서 시간초과..ㅎㅎ)

```jsx
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...rgb] = input.map((v) => v.split(" ").map(Number));

function solution(N, rgb) {
  let answer = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < 3; i++) {
    const dp = Array.from({ length: N }, () =>
      Array.from({ length: 3 }, () => Array(3).fill(Infinity))
    );
    const queue = [[i, rgb[0][i], 1]];

    while (queue.length > 0) {
      const [dist, cost, cnt] = queue.shift();
      if (cnt === N) break;

      for (let k = 0; k < 3; k++) {
        if (dist !== k && dp[cnt][k][k] >= cost + rgb[cnt][k]) {
          queue.push([k, cost + rgb[cnt][k], cnt + 1]);
          dp[cnt][k][k] = cost + rgb[cnt][k];
        }
      }
    }

    answer = Math.min(answer, ...dp[N - 1].flatMap((v) => v));
  }

  return answer;
}

console.log(solution(N, rgb));
```

### 2차 풀이

```js
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...rgb] = input.map((v) => v.split(" ").map(Number));

function solution(N, rgb) {
  const dp = rgb;

  for (let i = 1; i < N; i++) {
    dp[i][0] = dp[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] = dp[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] = dp[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
  }

  console.log(Math.min(...dp[N - 1]));
}

solution(N, rgb);
```
