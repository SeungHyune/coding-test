# **Sort 마스터 배지훈의 후계자**

[문제 링크](https://www.acmicpc.net/problem/20551)

### 문제

지훈이는 Sort 마스터다. 오랫동안 Sort 마스터 자리를 지켜온 지훈이는 이제 마스터 자리를 후계자에게 물려주려고 한다. 수많은 제자들 중에 후계자를 고르기 위해서 지훈이는 제자들에게 문제를 준비했다. 먼저 제자들에게 N개의 원소를 가진 배열 A를 주고, A의 원소들이 오름차순으로 정렬된 배열 B를 만들게 한다.
그다음 M개의 질문을 한다. 각 질문에는 정수 D가 주어진다. 제자들은 주어진 정수 D가 B에서 가장 먼저 등장한 위치를 출력하면 된다. 단, D가 B에 존재하지 않는 경우에는 -1를 출력한다. Sort 마스터의 자리를 너무나도 물려받고 싶은 창국이를 위해 지훈이의 문제를 풀 수 있는 프로그램을 만들어 주자.

<br/>

### 입력

첫째 줄에 배열A의 원소의 개수 N과 질문의 개수 M이 공백으로 구분되어 주어진다.

다음 줄부터 N줄에 걸쳐 정수 A0,A1,...,AN−1이 주어진다.

다음 줄부터 M줄에 걸쳐 정수 D가 주어진다.

<br/>

### 출력

*M*개의 질문에 대해서 주어진 D가 B에서 처음으로 등장한 위치를 출력한다. 단, 존재하지 않는다면 -1를 출력한다. (배열에서 가장 앞의 원소의 위치는 0이다.)

<br/>

### 제한

- 1 ≤ N ≤ 2×10^5
- 1 ≤ M ≤ 2×10^5
- 10 ≤ A_i ≤ 10^9
- 10 ≤ D ≤ 10^9

<br/>

### 예제 입력

```jsx
// 예제 입력 1
5 5
9
0
-1
3
2
-1
10
5
9
0

// 예제 출력 1
0
-1
-1
4
1
```

<br/>

### 📕 문제 포인트

1. 배열 A를 오름차순 정렬한다.
2. M 개의 질문을 순회하며 각 질문에 대해 배열 A에 어떤 인덱스에 존재하는지 이분 탐색한다.
3. 이때, 배열 A에 동일한 원소가 존재할 경우 가장 먼저 나온 원소의 인덱스를 출력한다.
4. 만약 배열 A에 원소가 존재하지 않는다면 -1을 출력한다.

### 📝 문제 풀이

```js
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map(Number);

const sortArr = arr.slice(0, N).sort((a, b) => a - b);
const qArr = arr.slice(N);

const answer = [];

for (const q of qArr) {
  let [start, end] = [0, N - 1];

  let result = -1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (sortArr[mid] === q) {
      result = mid;
      end = mid - 1;
    } else if (sortArr[mid] < q) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  answer.push(result);
}

console.log(answer.join("\n"));
```
