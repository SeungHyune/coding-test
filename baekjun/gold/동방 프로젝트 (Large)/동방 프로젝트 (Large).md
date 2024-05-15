# **동방 프로젝트 (Large)**

[문제 링크](https://www.acmicpc.net/problem/14595)

### 문제설명

동아리방이 가지고 싶었던 병찬이는 LINK 사업단에 문의하여 N개의 방 중의 하나를 얻을 기회를 얻었다. 일자로 되어있는 건물에 N개의 방은 일직선상에 존재하며, 각 방에는 번호가 매겨져 있다. 맨 왼쪽 방의 번호는 1번이며, 순서대로 증가하여 맨 오른쪽 방의 번호가 N번이다. 각 방 사이에는 방을 구분하는 벽이 존재한다.

물론 병찬이 외에도 많은 사람이 동아리방을 원한다. 다행히 방은 충분했기에 병찬이는 안심하고 있었지만…

그때였다.

빅-종빈빌런이 나타나 건물 벽을 허물기 시작한 것이다! 빅-종빈빌런은 다음과 같은 규칙으로 벽을 무너뜨린다.

- x < y 를 만족하는 두 방에 대해서 x번 방부터 y번 방 사이에 있는 모든 벽을 허문다.
- 두 방 사이의 벽이 허물어지면 두 방은 하나의 방으로 합쳐진다.
- 이미 허물어진 벽이 존재한다면 무시하고 다음 벽을 허문다.
- 빅-종빈빌런은 건물이 무너지는 걸 원치 않기 때문에, 1번 방의 왼쪽 벽과 N번 방의 오른쪽 벽(즉, 바깥과 연결된 벽)은 허물지 않는다.

동아리 방의 개수가 점점 줄어들자 병찬이는 초조해졌다. 이에 병찬이는 동아리방을 얻을 수 있는지에 대한 확률을 계산하기 위해 남는 동아리방의 수를 구하고 싶어 한다. 병찬이를 위해 빅-종빈빌런의 행동 횟수 M과 동방의 개수 N이 주어졌을 때, 남은 동아리방의 수를 구해주자.

<br>

### 입력

첫 번째 줄에는 동아리방의 개수를 나타내는 양의 정수 N(2 ≤ N ≤ 1,000,000) 이 주어진다. 두 번째 줄에는 빅-종빈빌런의 행동 횟수를 나타내는 음이 아닌 정수 M(0 ≤ M ≤ 5,000) 이 주어진다. 세 번째 줄부터 M개의 줄에 걸쳐 빅-종빈빌런의 행동이 양의 정수 x, y(1 ≤ x < y ≤ N) 로 주어진다. 여기서 행동이란 x번 방부터 y번 방 사이의 벽을 무너뜨리는 것을 의미한다.

빅-종빈빌런은 매우 허당이기 때문에 동일한 행동을 여러 번 할 수 있음에 유의하라.

<br>

### 출력

빅-종빈빌런의 모든 행동이 끝난 후 남아있는 동방의 개수를 한 줄에 출력한다.

<br>

### 예제

```jsx
// 예제 1
5
2
1 2
2 4

// 예제 출력 1
2

// 예제 2
5
1
1 5

// 예제 출력 2
1
```

<br>

### 📕 문제 포인트

1. 가장 먼저 중복된 벽 부수기 행동을 하나의 배열로 합쳐주는 작업을 해야 합니다.
2. 벽 부수기 행동을 정렬해 줍니다. (시작 번호로 내림차순 정렬합니다. 만약 시작 번호가 같다면 끝나는 번호로 내림차순 정렬합니다.)
   - 내림차순 정렬을 하는 이유는 추후 `pop()` 메서드를 사용하기 위함입니다.
3. 정렬이 완료되었다면 `arr.pop()` 한 값을 `resultArr` 배열에 넣어줍니다.
4. while 문을 통해 벽 부수기 행동이 없어질 때까지 반복합니다.
   - 이때 resultArr에 담긴 값을 pop()하고 arr에 담긴 값을 pop()합니다.
   - `const [start, end] = resultArr.pop()` / `const [start2, end2] = arr.pop()`
   - `start`의 값이 무조건 더 작은 값이므로 `start` , `end` 사이에 `start2` 값이 들어갈 수 있는지 확인합니다.
   - 만약 들어간다면 `end` 와 `end2` 를 비교하여 더 큰 값을 `resultArr.push([start, 더 큰 end 값])`을 추가해 줍니다.
   - 만약 `start` , `end` 값 사이에 들어갈 수 없다면 이어 붙이기 불가능한 배열이기 때문에 새로운 배열로 `resultArr` 에 `push` 합니다.
   - 이를 모두 반복하면 이어 붙여진 배열이 만들어집니다. 이를 통해 추후 방을 생성한 후 제거합니다.
5. N 개의 방이 존재하고 **각 방 양옆에는 벽이 존재**한다.
   - **결국 N + 1개의 벽이 존재**한다는 의미입니다.
   - `visited 배열`을 통해 **벽을 배열**로 만들어준다.
6. 빌런은 **동일한 벽 부수기 행동을 여러 번 할 수 있습니다.**
   - **벽을 부실 때 `x - y`까지의 벽을 부순다.** 벽이 부서진 경우 `visited`에 `true`로 체크를 해서 벽을 부쉈다는 것을 나타내준다.
7. 모든 반복이 완료된 후 남아 있는 벽을 통해 방의 개수를 파악한다. **방은 `벽의 개수  - 1`이다.**

### 문제 풀이

```js
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());
const M = Number(input.shift());
const arr = input.map((a) => a.split(" ").map(Number));

// 벽을 부수는 경우가 없는 경우 방을 그대로 출력한다.
if (arr.length === 0) {
  console.log(N);
  return;
}

// 내림차순 정렬, 만약 시작 숫자가 같은 경우 끝나는 숫자가 큰 숫자가 앞으로 오도록 정렬
arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return b[1] - a[1];
  }
  return b[0] - a[0];
});

function solution() {
  const resultArr = [arr.pop()];

  while (arr.length > 0) {
    const [start, end] = resultArr.pop();
    const [start2, end2] = arr.pop();

    // start2가 end보다 작거나 같다면 하나의 배열로 합쳐줍니다.
    // start2는 start보다 클 수가 없습니다.
    if (start2 <= end) {
      if (end > end2) {
        resultArr.push([start, end]);
      } else {
        resultArr.push([start, end2]);
      }
    } else {
      resultArr.push([start, end]);
      resultArr.push([start2, end2]);
    }
  }

  const visited = Array.from({ length: N + 1 }, () => false);

  while (resultArr.length > 0) {
    const [x, y] = resultArr.pop();

    for (let i = x; i < y; i++) {
      visited[i] = true;
    }
  }

  const wall = visited.filter((visit) => visit === false).length - 1;

  return wall;
}

console.log(solution());
```
