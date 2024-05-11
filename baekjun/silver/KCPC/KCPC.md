# **KCPC**

[문제 링크](https://www.acmicpc.net/problem/3758)

### 문제설명

당신은 유명 프로그래밍 대회인 KCPC(Korean Collegiate Programming Contest)에 참가하고 있다. 이 대회에서 총 k개의 문제를 풀게 되는데, 어떤 문제에 대한 풀이를 서버에 제출하면 그 문제에 대해 0점에서 100점 사이의 점수를 얻는다. 풀이를 제출한 팀의 ID, 문제 번호, 점수가 서버의 로그에 제출되는 시간 순서대로 저장된다. 한 문제에 대한 풀이를 여러 번 제출할 수 있는데, 그 중 최고 점수가 그 문제에 대한 최종 점수가 된다. (만약 어떤 문제에 대해 풀이를 한번도 제출하지 않았으면 그 문제에 대한 최종 점수는 0점이다.)

당신 팀의 최종 점수는 각 문제에 대해 받은 점수의 총합이고, 당신의 순위는 (당신 팀보다 높은 점수를 받은 팀의 수)+1 이다.

점수가 동일한 팀이 여럿 있을 수 있는데, 그 경우에는 다음 규칙에 의해서 순위가 정해진다.

1. 최종 점수가 같은 경우, 풀이를 제출한 횟수가 적은 팀의 순위가 높다.
2. 최종 점수도 같고 제출 횟수도 같은 경우, 마지막 제출 시간이 더 빠른 팀의 순위가 높다.

동시에 제출되는 풀이는 없고, 모든 팀이 적어도 한 번은 풀이를 제출한다고 가정하라.

서버의 로그가 주어졌을 때, 당신 팀의 순위를 계산하는 프로그램을 작성하시오.

<br>

### 입력

입력 데이터는 표준 입력을 사용한다. 입력은 T개의 테스트 데이터로 구성된다. 입력의 첫 번째 줄에는 테스트 데이터의 수를 나타내는 정수 T가 주어진다. 각 테스트 데이터의 첫 번째 줄에는 팀의 개수 n, 문제의 개수 k, 당신 팀의 ID t, 로그 엔트리의 개수 m을 나타내는 4 개의 정수가 주어진다. 여기서, 3 ≤ n, k ≤ 100, 1 ≤ t ≤ n, 3 ≤ m ≤ 10,000이다. 그 다음 m개의 줄에는 각 풀이에 대한 정보가 제출되는 순서대로 주어진다. 각 줄에는 팀 ID i, 문제 번호 j, 획득한 점수 s를 나타내는 세 개의 정수가 주어진다. 여기서 1 ≤ i ≤ n, 1 ≤ j ≤ k, 0 ≤ s ≤ 100이다.

<br>

### 출력

출력은 표준출력을 사용한다. 주어진 각 테스트 데이터에 대해 당신 팀의 순위를 한 줄에 출력하여야 한다.

<br>

### 예제

```jsx
// 예제 1
2
3 4 3 5
1 1 30
2 3 30
1 2 40
1 2 20
3 1 70
4 4 1 10
1 1 50
2 1 20
1 1 80
3 1 0
1 2 20
2 2 10
4 3 0
2 1 0
2 2 100
1 4 20

// 예제 출력 1
1
2
```

<br>

### 📕 문제 포인트

1. 팀의 개수 `n`, 문제의 개수 `k`, 우리 팀 ID `t` , 로그 개수 `m` 4개의 정수와 `m` 개의 문제를 푼 팀 `i` , 문제 번호 `j` , 획득한 점수 `s` 가 주어집니다.
2. 로그를 담고 있는 배열을 순회하면서 각 팀별로 점수를 `map` 메서드에 기록하고 점수가 같은 경우 비교할 제출 순서인 index `i` 번호마다 제출한 횟수를 모두 기록합니다.
3. 이후 기록된 정보 `map` 을 배열로 바꿔서 정렬합니다.
   - 정렬은 가장 높은 점수를 기준으로 합니다.
   - 점수가 같은 경우 제출 횟수가 더 적은 팀의 순위가 높습니다.
   - 만약 제출 횟수까지 같다면 제출한 순서가 더 빠른 팀의 순위가 높습니다.
4. 정렬이 완료되었다면 우리 팀의 순위를 출력합니다.

### 문제 풀이

```js
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = Number(input.shift());
input = input.map((a) => a.split(" ").map(Number));

const arr = [];
const result = [];

for (let i = 0; i < T; i++) {
  const [teamLength, questionLength, myTeam, submitLength] = input.shift();

  const restArr = input.splice(0, submitLength);
  const array = [
    [teamLength, questionLength, myTeam, submitLength],
    [...restArr],
  ];
  arr.push(array);
}

arr.forEach((data) => {
  const [teamLength, questionLength, myTeam, submitLength] = data.shift();

  const map = new Map();

  const submit = data.shift();

  for (let i = 0; i < submitLength; i++) {
    const [team, question, score] = submit[i];
    const teamChk = map.has(team);
    const questionChk = map.get(team);

    if (teamChk) {
      const answer = { ...map.get(team) };
      answer.index = i;

      if (questionChk[question] >= score) {
        answer.count++;
        map.set(team, { ...answer });
        continue;
      }

      answer[question] = score;
      answer.count++;
      map.set(team, { ...answer });
    } else {
      const answer = {
        [question]: score,
        count: 1,
        index: i,
      };
      map.set(team, { ...answer });
    }
  }

  const mapArray = [...map];

  const ranking = [];

  for (const [key, value] of mapArray) {
    let sum = 0;
    let [count, index] = [0, 0];

    for (const key in value) {
      if (key === "count") {
        count = value[key];
      } else if (key === "index") {
        index = value[key];
      } else {
        sum += value[key];
      }
    }

    ranking.push([sum, count, index, key]);
  }

  ranking.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        if (a[2] !== b[2]) {
          return a[2] - b[2];
        }
      }

      return a[1] - b[1];
    }

    return b[0] - a[0];
  });

  for (let i = 0; i < ranking.length; i++) {
    if (ranking[i][3] === myTeam) {
      result.push(i + 1);
    }
  }
});

console.log(result.join("\n"));
```
