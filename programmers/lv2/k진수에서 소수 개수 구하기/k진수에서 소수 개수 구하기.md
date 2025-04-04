# **k진수에서 소수 개수 구하기**

---

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/92335)

### 문제 설명

양의 정수 `n`이 주어집니다. 이 숫자를 `k`진수로 바꿨을 때, 변환된 수 안에 아래 조건에 맞는 소수(Prime number)가 몇 개인지 알아보려 합니다.

- `0P0`처럼 소수 양쪽에 0이 있는 경우
- `P0`처럼 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우
- `0P`처럼 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우
- `P`처럼 소수 양쪽에 아무것도 없는 경우
- 단, `P`는 각 자릿수에 0을 포함하지 않는 소수입니다.
  - 예를 들어, 101은 `P`가 될 수 없습니다.

예를 들어, 437674을 3진수로 바꾸면 `211`0`2`01010`11`입니다. 여기서 찾을 수 있는 조건에 맞는 소수는 왼쪽부터 순서대로 211, 2, 11이 있으며, 총 3개입니다. (211, 2, 11을 `k`진법으로 보았을 때가 아닌, 10진법으로 보았을 때 소수여야 한다는 점에 주의합니다.) 211은 `P0` 형태에서 찾을 수 있으며, 2는 `0P0`에서, 11은 `0P`에서 찾을 수 있습니다.

정수 `n`과 `k`가 매개변수로 주어집니다. `n`을 `k`진수로 바꿨을 때, 변환된 수 안에서 찾을 수 있는 **위 조건에 맞는 소수**의 개수를 return 하도록 solution 함수를 완성해 주세요.

### 제한사항

- 1 ≤ `n` ≤ 1,000,000
- 3 ≤ `k` ≤ 10

### **입출력 예**

| n      | k   | result |
| ------ | --- | ------ |
| 437674 | 3   | 3      |
| 110011 | 10  | 2      |

### **입출력 예 설명**

- **입출력 예 #1**
  - 문제 예시와 같습니다.
- **입출력 예 #2**
  - 110011을 10진수로 바꾸면 110011입니다. 여기서 찾을 수 있는 조건에 맞는 소수는 11, 11 2개입니다. 이와 같이, 중복되는 소수를 발견하더라도 모두 따로 세어야 합니다.

### 📕 문제 포인트

1. 입력받은 10진수 수 `n` 을 `k` 진수로 변환해 줍니다. (`n.toString(k)`)
2. 빈 배열 `arr` 을 생성하여 k 진수 문자열을 0을 기준으로 나눈 각 부분을 저장합니다.
   - num 변수를 사용해서 현재 숫자를 임시로 저장합니다.
   - 문자열의 각 문자 a를 순회하면서 a가 0보다 크면 `num`에 추가합니다.
   - a가 0이면 현재 `num` 을 arr에 추가하고 `num` 을 초기화합니다.
   - 문자열 끝에서 남아있는 `num` 도 배열에 추가합니다.
3. arr 배열의 각 요소를 순회하면서 요소가 1보다 큰 경우에만 소수 판별을 진행합니다.
4. 소수 판별을 위해 `flag` 변수를 1로 초기화하고, 2부터 해당 수의 제곱근까지 반복하여 나누어떨어지는 수가 있는지 체크합니다.
   - 나누어 떨어지는 수가 없으면 `flag`를 유지하고, 그렇지 않으면 0으로 변경합니다.
   - `flag` 가 여전히 1인 경우, `answer`를 1 증가시킵니다.

### 📝 문제 풀이

```js
function solution(n, k) {
  let answer = 0;
  let string = n.toString(k);
  let arr = [];
  let num = "";
  for (const a of string) {
    if (a > 0) num += a;
    else if (a === "0") {
      arr.push(num);
      num = "";
    }
  }

  if (num.length > 0) arr.push(num);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 1) {
      let flag = 1;
      for (let j = 2; j <= Math.sqrt(arr[i]); j++) {
        if (arr[i] % j === 0) {
          flag = 0;
          break;
        }
      }
      if (flag) answer++;
    }
  }
  return answer;
}
```
