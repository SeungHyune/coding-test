# CD

[문제 링크](https://www.acmicpc.net/problem/4158)

### 문제설명

상근이와 선영이는 동시에 가지고 있는 CD를 팔려고 한다. CD를 몇 개나 팔 수 있을까?

<br/>

### 입력

입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스의 첫째 줄에는 상근이가 가지고 있는 CD의 수 N, 선영이가 가지고 있는 CD의 수 M이 주어진다. N과 M은 최대 백만이다. 다음 줄부터 N개 줄에는 상근이가 가지고 있는 CD의 번호가 오름차순으로 주어진다. 다음 M개 줄에는 선영이가 가지고 있는 CD의 번호가 오름차순으로 주어진다. CD의 번호는 십억을 넘지 않는 양의 정수이다. 입력의 마지막 줄에는 0 0이 주어진다.

상근이와 선영이가 같은 CD를 여러장 가지고 있는 경우는 없다.

<br/>

### 출력

두 사람이 동시에 가지고 있는 CD의 개수를 출력한다.

<br/>

### 예제

```jsx
// 예제 1
3 3
1
2
3
1
2
4
0 0

// 예제 출력 1
2
```

<br/>

### 📕 문제 포인트

1. 문제 설명에 따라 여러 개의 테스트 케이스가 존재한다.

   ```jsx
   // 1번째 케이스
   1 1
   1
   3
   // 2번째 케이스
   1 2
   3
   3
   4
   // 종료를 의미하는 케이스
   0 0
   ```

2. 테스트 케이스의 끝은 마지막 `0 0` 이 출력되면 종료한다.
3. 문제 풀이에서는 N, M 배열을 각각 `splice` 메서드를 사용해 N, M의 개수만큼 잘라서 만들어줬다.
   - 이후 N 배열 `[N포인트] === M배열[M포인트]`가 서로 같다면, result 값을 1 증가시켜주고
     **두 포인트를 모두 1씩 증가** 시켜주었다.
   - 만약 `N배열[N포인트]  < M배열[M포인트]` 값이 더 크다면 **N포인트만 1 증가**시켜주었다.
     반대로 `M배열[M포인트] < N배열[N포인트]` 값이 더 크다면 **M 포인트만 1 증가**시켜주었다.
   - 위 조건이 가능한 이유는 각 배열은 오름차순으로 정렬되어 있기 때문이다.

### 📝 문제 풀이

```js
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

while (true) {
  const [N, M] = input.shift().split(" ").map(Number);

  if (N === 0 && M === 0) break;

  const NArray = input.splice(0, N).map(Number);
  const MArray = input.splice(0, M).map(Number);

  let [NPoint, MPoint] = [0, 0];

  let result = 0;

  while (true) {
    const NValue = NArray[NPoint];
    const MValue = MArray[MPoint];

    if (NValue === MValue) {
      result++;
      NPoint++;
      MPoint++;
    } else if (NValue < MValue) {
      NPoint++;
    } else {
      MPoint++;
    }

    if (NPoint >= N || MPoint >= M) {
      break;
    }
  }

  console.log(result);
}
```
