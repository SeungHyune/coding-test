# **Your life**

[문제 링크](https://www.acmicpc.net/problem/10917)

### 문제

당신이 꿈을 이루는 과정 중에 일어날 수 있는 수많은 상황들의 관계를 그래프로 나타내어 보겠다. 많은 상황을 압축해서 N개의 상황이 일어날 수 있다고 하고 1번에서 N까지의 번호를 붙였다. 당신은 현재 1번 상황에 있다. 그리고 N번 상황은 당신이 이루고자 하는 유일한 꿈이다.

상황은 당신의 선택에 따라 변화할 수 있다. 당신이 선택할 수 있는 변화는 총 M개 있으며 x, y의 형태로 주어진다. 이는 당신이 상태 x에 있는 경우 상태 y로 가는 선택을 할 수 있다는 것을 의미하며, x < y임이 보장된다.

당신은 꿈을 이룰 수 있을까? 이룰 수 있다면 당신의 상황이 변화하는 횟수를 최소한으로 줄이면 몇 번 만에 꿈을 이룰 수 있을까?

<br/>

### 입력

첫 번째 줄에는 두 개의 자연수 N, M(0 ≤ M ≤ 200,000)이 주어진다.

이후 M개의 줄에는 두 개의 자연수 x, y(1 ≤ x < y ≤ N)가 공백으로 구분되어 주어진다

1 ≤ N ≤ 100,000인 입력이 주어진다.

<br/>

### 출력

당신이 꿈을 이룰 수 있다면 꿈을 이루기 위해 필요한 상황 변화 수의 최솟값을 출력하고, 이룰 수 없다면 -1을 출력한다.

<br/>

### 예제 입력

```jsx
// 예제 입력 1
4 4
1 2
2 3
3 4
2 4

// 예제 출력 1
2
```

<br/>

### 📕 문제 포인트

1. 1번 상황에서 시작해서 `N` 번 상황에 도달하는 **최소 횟수**를 구해야한다. 만약 도달할 수 없다면 `-1`을 출력한다.
2. 주어진 상태 `x`에 있는 경우 `y`로 가는 선택을 할 수 있고, `y`또한 `x`로 가는 선택을 할 수 있다. 그렇기 때문에 양방향 그래프로 생각하여 N 크기의 graph 배열을 만들어 x,y의 번호를 연결해줬다.
3. 이제 queue에 1번부터 시작하여 count를 0으로 시작하여 BFS 탐색을 시작한다.
4. BFS 탐색을 통해 `current` 값이 `N`이 될 때 바로 BFS 탐색을 종료 시켰으며, 중복되는 탐색을 막기 위해 N 크기의 `visited` 배열을 만들어서 이미 방문한 번호에는 방문하지 못하도록 했다.
5. 마지막까지 순회를 이어가도 N에 도달할 수 없다면 `-1`을 도달하는 경우에는 `count` 값을 출력하도록 하여 문제를 해결했다.

### 📝 문제 풀이

```js
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (const [x, y] of arr) {
  graph[x].push(y);
  graph[y].push(x);
}

const visited = Array.from({ length: N + 1 }, () => false);
visited[1] = true;

const queue = [[1, 0]];

let answer = Infinity;

while (queue.length > 0) {
  const [current, count] = queue.shift();

  if (current === N) {
    answer = count;
    break;
  }

  for (let k = 0; k < graph[current].length; k++) {
    const next = graph[current][k];

    if (visited[next]) continue;

    visited[next] = true;
    queue.push([next, count + 1]);
  }
}

const result = answer === Infinity ? -1 : answer;
console.log(result);
```
