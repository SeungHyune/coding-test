# **NBA 농구**

[문제 링크](https://www.acmicpc.net/problem/2852)

### 문제설명

동혁이는 NBA 농구 경기를 즐겨 본다. 동혁이는 골이 들어갈 때 마다 골이 들어간 시간과 팀을 적는 이상한 취미를 가지고 있다.

농구 경기는 정확히 48분동안 진행된다. 각 팀이 몇 분동안 이기고 있었는지 출력하는 프로그램을 작성하시오.

!https://www.acmicpc.net/JudgeOnline/upload/201007/qazwqszx.png

<br/>

### 입력

첫째 줄에 골이 들어간 횟수 N(1<=N<=100)이 주어진다. 둘째 줄부터 N개의 줄에 득점 정보가 주어진다. 득점 정보는 득점한 팀의 번호와 득점한 시간으로 이루어져 있다. 팀 번호는 1 또는 2이다. 득점한 시간은 MM:SS(분:초) 형식이며, 분과 초가 한자리 일 경우 첫째자리가 0이다. 분은 0보다 크거나 같고, 47보다 작거나 같으며, 초는 0보다 크거나 같고, 59보다 작거나 같다. 득점 시간이 겹치는 경우는 없다.

<br/>

### 출력

첫째 줄에 1번 팀이 이기고 있던 시간, 둘째 줄에 2번 팀이 이기고 있던 시간을 출력한다. 시간은 입력과 같은 형식(MM:SS)으로 출력한다.

<br/>

### 예제

```jsx
// 예제 1
5
1 01:10
1 02:20
2 45:30
2 46:40
2 47:50

// 예제 출력 1
45:30
00:10
```

<br/>

### 📕 문제 포인트

1. 시간을 계산하기 편하게 모두 second(초)로 변경하여 계산한다. 골을 넣은 팀 번호와 골을 넣은 시간을 매번 기록한다.
2. 현재 골을 넣은 팀이 상대팀 보다 1점 차로 이기고 있다면 골읗 넣기 전에는 비기고 있던 상황이기 때문에 현재 골을 넣은 팀에 이기고 있던 시간을 추가하지 않는다.
3. 현재 골을 넣은 팀이 상대팀 보다 2점 차 이상으로 이기고 있다면 마지막으로 골이 들어간 시간을 현재 시간에서 뺀 값을 현재 팀에 누적한다.
4. 만약 현재 팀이 골을 넣었는데, 동점이거나 지고 있다면 이전에도 지고 있었기 때문에 상대팀 시간을 추가한다. (현재 시간 - 마지막으로 골이 들어간 시간으로 계산한다.)
5. 모든 반복이 종료되면, 마지막에 이기고 있는 팀이 있는지 찾는다. 서로 비기고 있다면 무시하고 이기고 있는 팀이 있는 경우 이기고 있는 팀이 골을 넣은 마지막 시간을 게임이 종료하는 48분에서 빼준 후 이기고 있는 팀에 시간을 추가해 준다.
6. 이후 second(초)로 누적되어 있는 시간을 `MM:SS` 문자열로 변환한 후 출력해 준다.

### 📝 문제 풀이

```js
// 1. 가장 처음 골 넣는 팀을 미리 시작 시간으로 설정한다.
// 2. 이후 골을 넣는 경우부터 순회한다.
// 3. 만약 골을 넣은 팀이 골을 넣고 비기게 된다면, 이전 팀이 이기고 있던 것이기 때문에 이전 골 넣은 시간부터 현재 골 들어간 시간을 빼서 상대팀에 시간을 증가한다.
// 4. 만약 골을 넣은 팀이 골을 넣어도 이기고 있다면, 이전에 골 넣은 시간을 현재 골 넣은 시점 시간에서 뺀 시간을 내 팀에 시간을 증가한다.
// 5. 모든 시간은 초로 변환해서 계산한 후 초로 누적한다.
// 6. 경기는 48분까지 존재하기 때문에 마지막 골을 넣은 팀과 상대팀 중 이기고 있는 팀이 있다면 이기고 있는 팀에 시간을 추가한다. (경기 종료 시간(48분) - 마지막 골 넣은 시간)
// 7. 만약 비기고 있다면 무시한다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...scoreArr] = input.map((a) => a.split(" "));

function solution() {
  const teamScore = [0, 0];
  const teamTime = [0, 0];

  let [lastGoalTime, lastGoalTeam] = firstScore();
  teamScoreAdd();
  lastScore();

  // 처음 골을 넣은 팀, 처음 골을 넣은 시간을 기록하는 함수
  function firstScore() {
    const [teamNumber, scoreTime] = scoreArr.shift();

    teamScore[Number(teamNumber) - 1] += 1;

    const [min, second] = scoreTime.split(":");

    const lastGoalTime = Number(min) * 60 + Number(second);
    const lastGoalTeam = Number(teamNumber) - 1;

    return [lastGoalTime, lastGoalTeam];
  }

  // 첫골을 제외한 매 득점마다 이기고 있는 팀에게 이기고 있던 시간을 누적해 주는 함수
  function teamScoreAdd() {
    for (const [teamNumber, scoreTime] of scoreArr) {
      const team = Number(teamNumber) - 1;
      const [min, second] = scoreTime.split(":");

      teamScore[team] += 1;

      const otherTeam = team === 0 ? 1 : 0;

      if (teamScore[team] - 1 > teamScore[otherTeam]) {
        // team에 시간 추가
        teamTime[team] += Number(min) * 60 + Number(second) - lastGoalTime;
      } else if (teamScore[team] === teamScore[otherTeam]) {
        // otherTeam에 시간 추가
        teamTime[otherTeam] += Number(min) * 60 + Number(second) - lastGoalTime;
      } else if (teamScore[team] < teamScore[otherTeam]) {
        // 골을 넣었는대도 골 넣은 팀이 지고 있다면
        teamTime[otherTeam] += Number(min) * 60 + Number(second) - lastGoalTime;
      }

      lastGoalTeam = team;
      lastGoalTime = Number(min) * 60 + Number(second);
    }
  }

  // 경기 종료 시간을 기준으로 이기고 있는 팀에게 시간을 추가하는 함수
  function lastScore() {
    const otherTeam = lastGoalTeam === 0 ? 1 : 0;

    if (teamScore[lastGoalTeam] > teamScore[otherTeam]) {
      teamTime[lastGoalTeam] += 48 * 60 - lastGoalTime;
    } else if (teamScore[otherTeam] > teamScore[lastGoalTeam]) {
      teamTime[otherTeam] += 48 * 60 - lastGoalTime;
    }

    for (const time of teamTime) {
      console.log(convertStringTime(time));
    }
  }

  // 초로 되어 있는 시간을 MM:SS 문자열로 변환하는 함수
  function convertStringTime(time) {
    const min = Math.floor(time / 60);
    const second = time % 60;

    let stringMin = "";

    if (min < 10) {
      stringMin = "0" + min;
    } else if (min === 0) {
      stringMin = "00";
    } else {
      stringMin = `${min}`;
    }

    let stringSecond = "";

    if (second < 10) {
      stringSecond = "0" + second;
    } else if (second === 0) {
      stringSecond = "00";
    } else {
      stringSecond = `${second}`;
    }

    return `${stringMin}:${stringSecond}`;
  }
}

solution();
```
