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
