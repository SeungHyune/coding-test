// N은 정육면체의 층이다.
// N*N은 한 층의 주사위 개수이다.

// 1 ~ N - 1 층의 경우
// 각 층의 모서리 = 4(모서리 수) * 서로 마주 보지 않는 최솟값 (2개의 합)
// 측면에서 보이는 면의 수 = ((N - 2) * 4) * 최솟값 (1개의 합)

// 위에서 구한 값의 합을 * N - 1 곱해줍니다. (윗면에 다른 정육면체 층이 놓이므로 윗면은 보이지 않는다. 각 면을 감싼 부분을 제외한 안쪽 정육면체는 보이지 않음.)

// 마지막으로 젤 위층은 1면이 더 보이게 되며, 안쪽에 있는 내부 정육면체는 위 면 한곳이 보이게 됨.
// 각 층의 모서리 = 4(모서리 수) * 서로 마주 보지 않는 최솟값 (3개의 합)
// 측면에서 보이는 면의 수 = ((N - 2) * 4) * 서로 마주 보지 않는 최솟값 (2개의 합)
// 보이지 않는 정육면체 수 = 한 층의 주사위 수 - 각층의 모서리 수(4개) + 측면에서 보이는 면의 수
// 보이지 않는 정육면체 수 * 최솟값 (1개)

// 모두 더한 값을 출력해라

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift()); // 정육면체 높이
const length = N * N; // 정육면체 한층의 주사위 수
const wall = (N - 2) * 4; // 정육면체 측면 (모서리를 제외한 측면)
const inWall = length - wall - 4; // 정육면체 내부 (측면 테두리를 제외한 내부)

const [dice] = input.map((a) => a.split(" ").map(Number));

const one = Math.min(...dice); // 가장 작은 수
let two = Number.MAX_SAFE_INTEGER; // 주사위 면이 마주 보지 않는 가장 작은 두 수의 합
let three = Number.MAX_SAFE_INTEGER; // 주사위 면이 마주 보지 않는 가장 작은 세 수의 합

// N이 1인 경우 가장 큰 수를 제외한 5면의 합을 구해야 함
if (N === 1) {
  const max = Math.max(...dice);
  const result = dice.reduce((prev, cur) => prev + cur, 0) - max;

  return console.log(result);
}

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    if (i === j || (i + 1 + j + 1) % 7 === 0) continue;

    two = Math.min(two, dice[i] + dice[j]);

    for (let k = 0; k < 6; k++) {
      if (
        i === k ||
        j === k ||
        (i + 1 + k + 1) % 7 === 0 ||
        (j + 1 + k + 1) % 7 === 0
      )
        continue;

      three = Math.min(three, dice[i] + dice[j] + dice[k]);
    }
  }
}

const firstFloor = (two * 4 + one * wall) * (N - 1);
const lastFloor = three * 4 + two * wall + one * inWall;

console.log(firstFloor + lastFloor);
