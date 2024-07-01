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
