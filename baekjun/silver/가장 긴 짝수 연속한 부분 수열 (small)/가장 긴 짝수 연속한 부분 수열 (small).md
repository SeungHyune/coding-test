# **가장 긴 짝수 연속한 부분 수열 (small)**

[문제 링크](https://www.acmicpc.net/problem/22857)

### 문제

길이가 N인 수열 S가 있다. 수열 S는 1 이상인 정수로 이루어져 있다.

수열 S에서 원하는 위치에 있는 수를 골라 최대 K번 삭제를 할 수 있다.

예를 들어, 수열 S가 다음과 같이 구성되어 있다고 가정하자.

```
수열 S : 1 2 3 4 5 6 7 8
```

수열 S에서 4번째에 있는 4를 지운다고 하면 아래와 같다.

```
수열 S : 1 2 3 5 6 7 8
```

수열 S에서 최대 K번 원소를 삭제한 수열에서 짝수로 이루어져 있는 연속한 부분 수열 중 가장 긴 길이를 구해보자.

<br/>

### 입력

수열 S의 길이 N와 삭제할 수 있는 최대 횟수인 K가 공백으로 구분되어 주어진다.

두 번째 줄에는 수열 S를 구성하고 있는 N개의 수가 공백으로 구분되어 주어진다.

<br/>

### 출력

수열S에서 최대 K번 원소를 삭제한 수열에서 짝수로 이루어져 있는 연속한 부분 수열 중 가장 긴 길이를 출력한다.

<br/>

### 제한

- 1≤N≤50,000
- 1≤K≤100
- 1≤ 원소의 값 ≤10^6

<br/>

### 예제 입력

```jsx
// 예제 입력 1
8 2
1 2 3 4 5 6 7 8

// 예제 출력 1
3
```

<br/>

### 📕 문제 포인트

1. max 변수에는 최대 길이를 저장합니다. left는 슬라이딩 윈도우 왼쪽 경계를 나타내며, oddCnt는 현재 구간의 홀수 개수를 기록합니다.
2. 슬라이딩 윈도우 기법을 통해 right 포인터를 사용하여 배열을 순회합니다. 각 요소가 홀수일 경우 oddCnt를 증가시킵니다.
3. 홀수의 개수가 K를 초과하면, left 포인터를 오른쪽으로 이동시켜 홀수 개수를 줄입니다. 이 과정에서 left가 가리키는 요소가 홀수일 경우 oddCnt를 감소시킵니다.
4. 현재 구간의 길이는 right - left + 1입니다. 여기서 홀수 개수를 빼고, max 값과 비교한 값 중 큰 값을 max에 업데이트합니다.

### 📝 문제 풀이

```js
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = (input) => {
  let [n, k] = input
    .shift()
    .split(" ")
    .map((v) => +v);
  let arr = input
    .shift()
    .split(" ")
    .map((v) => +v);

  let max = 0;
  let left = 0;
  let oddCnt = 0;

  for (let right = 0; right < n; right++) {
    if (arr[right] % 2 !== 0) {
      oddCnt += 1;
    }

    while (oddCnt > k) {
      if (arr[left] % 2 !== 0) {
        oddCnt -= 1;
      }
      left += 1;
    }

    max = Math.max(max, right - left + 1 - oddCnt);
  }

  console.log(max);
};

solution(input);
```
