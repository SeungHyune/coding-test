const fs = require("fs");
let [[P, M], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" "));

// 방, 유저를 map을 통해 생성
const map = new Map();
const user = arr.shift();
map.set(1, [Number(user[0]), [[...user]]]);

// map에 key로 담기는 방 번호
let oder = 2;

// 두 번째 유저부터 순회하면서 현재 생성된 방에 입장할 수 있는지 체크
for (const [level, nickname] of arr) {
  let flag = false;
  for (const [key, value] of map) {
    const range = value[0];
    const array = [...value[1]];

    // 현재 생성된 방에 입장할 수 있는 경우 입장
    if (
      Number(level) >= range - 10 &&
      Number(level) <= range + 10 &&
      array.length < M
    ) {
      flag = true;
      array.push([level, nickname]);
      map.set(key, [range, array]);
      break;
    }
  }

  // 현재 생성된 방에 입장할 수 없는 경우 새로 방을 만든다.
  if (flag === false) {
    map.set(oder++, [Number(level), [[level, nickname]]]);
  }
}

// 방 번호 순서대로 정렬
const mapArray = [...map].sort((a, b) => a[0] - b[0]);

for (const [key, value] of mapArray) {
  // 방에 있는 유저들의 닉네임을 사전순으로 정렬
  const array = value[1].sort((a, b) => {
    if (a[1] > b[1]) return 1;
    else return -1;
  });

  if (array.length === Number(M)) {
    // 방이 시작된 경우
    console.log("Started!");
  } else {
    // 방이 대기중인 경우
    console.log("Waiting!");
  }

  // 현재 방에 있는 유저들을 순차적으로 출력
  for (const info of array) {
    console.log(info.join(" "));
  }
}
