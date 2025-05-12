# **IF문 좀 대신 써줘**

[문제 링크](https://www.acmicpc.net/problem/19637)

### 문제

게임 개발자인 밀리는 전투력 시스템을 만들어, 캐릭터가 가진 전투력을 기준으로 칭호를 붙여주려고 한다.

예를 들어, 전투력 10,000 이하의 캐릭터는 WEAK, 10,000 초과 그리고 100,000 이하의 캐릭터는 NORMAL, 100,000 초과 그리고 1,000,000 이하의 캐릭터는 STRONG 칭호를 붙여준다고 하자. 이를 IF문으로 작성한다면 아래와 같이 구현할 수 있다.

```
if power <= 10000
 print WEAK
else if power <= 100000
 print NORMAL
else if power <= 1000000
 print STRONG
```

혼자서 게임을 개발하느라 매우 바쁜 밀리를 대신해서, 캐릭터의 전투력에 맞는 칭호를 출력하는 프로그램을 작성하자.

<br/>

### 입력

첫 번째 줄에는 칭호의 개수 *N* (1 ≤ *N* ≤ 105)과 칭호를 출력해야 하는 캐릭터들의 개수 *M* (1 ≤ *M* ≤ 105)이 빈칸을 사이에 두고 주어진다. (1 ≤ *N, M* ≤ 105)

두 번째 줄부터 *N*개의 줄에 각 칭호의 이름을 나타내는 길이 1 이상, 11 이하의 영어 대문자로만 구성된 문자열과 해당 칭호의 전투력 상한값을 나타내는 109 이하의 음이 아닌 정수가 주어진다. 칭호는 전투력 상한값의 비내림차순으로 주어진다.

*N* + 2번째 줄부터 *M*개의 각 줄에는 캐릭터의 전투력을 나타내는 음이 아닌 정수가 주어진다. 해당하는 칭호가 없는 전투력은 입력으로 주어지지 않는다.

<br/>

### 출력

*M*개의 줄에 걸쳐 캐릭터의 전투력에 맞는 칭호를 입력 순서대로 출력한다. 어떤 캐릭터의 전투력으로 출력할 수 있는 칭호가 여러 개인 경우 가장 먼저 입력된 칭호 하나만 출력한다.

<br/>

### 예제 입력

```jsx
// 예제 입력 1
3 8
WEAK 10000
NORMAL 100000
STRONG 1000000
0
9999
10000
10001
50000
100000
500000
1000000

// 예제 출력 1
WEAK
WEAK
WEAK
NORMAL
NORMAL
NORMAL
STRONG
STRONG
```

<br/>

### 📕 문제 포인트

1. 각 캐릭터의 전투력을 순회하며 해당 전투력이 어떤 칭호에 속해있는지 탐색한다.
   - 이때, 이분 탐색을 통해 start는 `0`, end는 `N - 1`을 두고 `mid` 값을 구한다.
2. mid를 통해 arr[mid] 칭호의 점수가 전투력보다 크거나 같은 경우에는 더 작은 값을 찾아야 하기 때문에 현재 index를 저장하고 `end` 값을 `mid - 1`로 변경하여 더 작은 칭호 값도 가능한지 찾는다.
3. 반대로 전투력이 칭호의 점수 보다 큰 경우에는 더 큰 칭호의 점수를 탐색해야 하므로 `start` 값을 `mid + 1`로 설정합니다.
4. 이렇게 이분 탐색을 하여 마지막에 남은 `index` 값을 통해 현재 캐릭터의 전투력에 알맞은 칭호를 출력합니다.

### 📝 문제 풀이

```js
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1);
const powers = input.slice(N + 1).map(Number);

const answer = [];

for (let i = 0; i < M; i++) {
  const currentScore = powers[i];

  let [start, end] = [0, N - 1];
  let target = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const [power, score] = arr[mid].split(" ");

    if (currentScore <= Number(score)) {
      target = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  const [power] = arr[target].split(" ");
  answer.push(power);
}

console.log(answer.join("\n"));
```
