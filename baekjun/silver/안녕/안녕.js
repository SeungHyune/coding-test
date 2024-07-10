// 세준이는 병원에 입원한 동안 자기를 생각해준 사람들에게 사람하다고 말할 차례이다.
// 세준이를 생각해준 사람은 총 N명이 있다.
// 사람의 번호는 1번부터 N번까지 있다.
// 세준이가 i번 사람에게 인사를하면 L[i]만큼의 체력을 잃고, J[i]만큼의 기쁨을 얻는다.
// 세준이는 각각의 사람에게 최대 1번만 말할 수 있다.

// 세준이의 목표는 주어진 체력내에서 최대한의 기쁨을 느끼는 것이다.
// 세준이의 체력은 100이고, 기쁨은 0이다.
// 만약 세준이의 체력이 0이나 음수가 되면, 죽어서 아무런 기쁨을 못 느낀 것이 된다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const dy = Array.from({ length: 101 }, () => 0);

for (let i = 0; i < N; i++) {
  const sad = arr[0][i];
  const happy = arr[1][i];

  for (let j = 100; j >= sad; j--) {
    if (j - sad <= 0) continue;
    dy[j] = Math.max(dy[j], dy[j - sad] + happy);
  }
}

console.log(dy[100]);
