# **2 x n 타일링**

---

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12900)

### 문제 설명

가로 길이가 2이고 세로의 길이가 1인 직사각형모양의 타일이 있습니다. 이 직사각형 타일을 이용하여 세로의 길이가 2이고 가로의 길이가 n인 바닥을 가득 채우려고 합니다. 타일을 채울 때는 다음과 같이 2가지 방법이 있습니다.

- 타일을 가로로 배치 하는 경우
- 타일을 세로로 배치 하는 경우

예를들어서 n이 7인 직사각형은 다음과 같이 채울 수 있습니다.

!https://i.imgur.com/29ANX0f.png

직사각형의 가로의 길이 n이 매개변수로 주어질 때, 이 직사각형을 채우는 방법의 수를 return 하는 solution 함수를 완성해주세요.

### 제한사항

- 가로의 길이 n은 60,000이하의 자연수 입니다.
- 경우의 수가 많아 질 수 있으므로, 경우의 수를 1,000,000,007으로 나눈 나머지를 return해주세요.

### **입출력 예**

| n   | result |
| --- | ------ |
| 4   | 5      |

### 📕 문제 포인트

1. dy 배열을 0으로 초기화합니다.
   - dy 배열은 각 n에 대한 타일링 방법의 수를 저장합니다.
2. n이 1일 때는 1가지 방법 ⇒ `1X2 타일 1개`
3. n이 2일 때는 2가지 방법 ⇒ `1X2 타일 2개 또는 2X1 타일 1개`
4. n이 3 이상인 경우 마지막에 1X2 타일을 놓는 경우 ⇒ `dy[i - 1]`
5. 마지막에 2X1 타일을 놓는 경우 ⇒ `dy[i - 2]`
6. 결국, `dy[i] = dy[i - 1] + dy[i - 2]`
7. 점화식을 통해 최종 결괏값 `dy[n]`을 출력하면 정답이 됩니다.

### 📝 문제 풀이

```js
function solution(n) {
  let dy = Array.from({ length: n + 1 }, () => 0);
  dy[1] = 1;
  dy[2] = 2;
  for (let i = 3; i <= n; i++) {
    dy[i] = (dy[i - 2] % 1000000007) + (dy[i - 1] % 1000000007);
  }
  return dy[n] % 1000000007;
}
```
