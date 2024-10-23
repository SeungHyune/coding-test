# DNA

[문제 링크](https://www.acmicpc.net/problem/1969)

### 문제

DNA란 어떤 유전물질을 구성하는 분자이다. 이 DNA는 서로 다른 4가지의 뉴클레오티드로 이루어져 있다(Adenine, Thymine, Guanine, Cytosine). 우리는 어떤 DNA의 물질을 표현할 때, 이 DNA를 이루는 뉴클레오티드의 첫글자를 따서 표현한다. 만약에 Thymine-Adenine-Adenine-Cytosine-Thymine-Guanine-Cytosine-Cytosine-Guanine-Adenine-Thymine로 이루어진 DNA가 있다고 하면, “TAACTGCCGAT”로 표현할 수 있다. 그리고 Hamming Distance란 길이가 같은 두 DNA가 있을 때, 각 위치의 뉴클오티드 문자가 다른 것의 개수이다. 만약에 “AGCAT"와 ”GGAAT"는 첫 번째 글자와 세 번째 글자가 다르므로 Hamming Distance는 2이다.

우리가 할 일은 다음과 같다. N개의 길이 M인 DNA s1, s2, ..., sn가 주어져 있을 때 Hamming Distance의 합이 가장 작은 DNA s를 구하는 것이다. 즉, s와 s1의 Hamming Distance + s와 s2의 Hamming Distance + s와 s3의 Hamming Distance ... 의 합이 최소가 된다는 의미이다.

<br/>

### 입력

첫 줄에 DNA의 수 N과 문자열의 길이 M이 주어진다. 그리고 둘째 줄부터 N+1번째 줄까지 N개의 DNA가 주어진다. N은 1,000보다 작거나 같은 자연수이고, M은 50보다 작거나 같은 자연수이다.

<br/>

### 출력

첫째 줄에 Hamming Distance의 합이 가장 작은 DNA 를 출력하고, 둘째 줄에는 그 Hamming Distance의 합을 출력하시오. 그러한 DNA가 여러 개 있을 때에는 사전순으로 가장 앞서는 것을 출력한다.

<br/>

### 예제 입력

```jsx
// 예제 입력 1
5 8
TATGATAC
TAAGCTAC
AAAGATCC
TGAGATAC
TAAGATGT

// 예제 출력 1
TAAGATAC
7
```

<br/>

### 📕 문제 포인트

1. 여러 개의 DNA와 가장 문자가 다른 것의 개수가 작은 DNA를 구하고, 다른 문자의 차이인 Hamming Distance를 출력하는 문제이다.
2. DNA 길이 \* DNA 수만큼 for 문으로 순회하며 모든 DNA의 각 자리를 비교한다.
3. 이중 가장 많이 나온 DNA를 찾는다.
   - 가장 많이 나온 DNA로 해야지 서로 다른 문자의 개수를 최소화할 수 있다.
   - 이때 만약 가장 많이 나온 문자가 중복된다면, 사전 순으로 앞서는 문자열을 출력한다.
4. 이렇게 각 자리에서 가장 많이 나온 DNA와 많이 나온 수를 찾는다.
5. 이후, 가장 많이 나온 DNA를 `resultStr`에 문자열로 더해주고, 가장 많이 나온 문자 수를 총 DNA의 수에서 뺀 값을 `resultNum`에 더해준다.
6. 이렇게 최종적으로 나온 `resultStr` , `resultNum` 을 출력한다.

### 📝 문제 풀이

```js
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

let [resultNum, resultStr] = [0, ""];

for (let i = 0; i < M; i++) {
  const map = new Map();

  for (let j = 0; j < N; j++) {
    const str = arr[j][i];

    map.set(str, (map.get(str) || 0) + 1);
  }

  let str = "";
  let max = 0;

  for (const [key, value] of map) {
    if (value >= max) {
      if (value === max && key > str) continue;

      max = value;
      str = key;
    }
  }

  resultNum += N - max;
  resultStr += str;
}

console.log(resultStr);
console.log(resultNum);
```
