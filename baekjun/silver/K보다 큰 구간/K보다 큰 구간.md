# **K보다 큰 구간**

[문제 링크](https://www.acmicpc.net/problem/14246)

### 문제

n개의 자연수로 이루어진 수열이 주어질 때, 특정 구간

[i,j] (i≤j)의 합이 k보다 큰 모든 쌍 (i,j)의 개수를 출력하시오.

<br/>

### 입력

첫째 줄에는 자연수의 개수 n이 주어진다. (1≤n≤100000)

다음 줄에는 자연수 n개가 주어진다. 자연수는 100000 보다 크지 않다.

그 다음 줄에는 자연수 k가 주어진다. (1≤k≤1000000000)

<br/>

### 출력

특정 구간 [i,j]의 합이 k보다 큰 모든 쌍 (i,j)의 개수를 출력하시오.

<br/>

### 예제 입력

```jsx
// 예제 입력 1
3
8 3 8
7

// 예제 출력 1
5
```

<br/>

### 📕 문제 포인트

1. 누적 합이 `K`를 넘는 구간의 수를 찾는 문제이다.
2. 먼저 N이 1인 경우 `arr[0]`이 **K보다 크면** `1` **아니라면** `0`을 출력하도록 했다.
3. 이후 for 문을 통해 0부터 N-1까지 순회하며 `arr[i]`를 `sum`에 넣고 sum이 **K보다 큰지 검사**했다.
   - **K보다 큰 경우** 이후 누적되는 합도 모두 K보다 크기 때문에 `answer`에 `N - i` 값을 더해주었다.
4. 만약 **K보다 작은 경우**라면 `변수 j`에 `i + 1` 값을 추가하여 K보다 작은 경우 `sum`에 `arr[j]` 값을 계속해서 더해줬다.
5. 그러다 K보다 큰 구간이 나오면 `answer`에 `N - j`를 하여 누적합 구간을 더해준 후 **즉시 while문을 break로 종료**했다.

### 📝 문제 풀이

```js
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const K = Number(input.pop());
const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

if (N === 1) {
  arr[0] > K ? console.log(1) : console.log(0);
  return;
}

let answer = 0;

for (let i = 0; i < N; i++) {
  const cur = arr[i];

  let sum = cur;

  if (sum > K) {
    answer += N - i;
    continue;
  }

  let j = i + 1;
  while (j < N) {
    sum += arr[j];

    if (sum > K) {
      answer += N - j;
      break;
    }

    j++;
  }
}

console.log(answer);
```
