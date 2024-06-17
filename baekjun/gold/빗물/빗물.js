const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
[input] = input.map((a) => a.split(" ").map(Number));

let rain = 0;
let start = [input[0], 0];

for (let i = 1; i < M; i++) {
  const next = input[i];

  // 블록이 0인 경우 빗물이 고일 수 없기 때문에 패스
  if (next === 0) {
    continue;
  }

  // 1 이상인 경우 start 지점의 index부터 현재 index 사이에 가장 작은 건물 높이 방금
  // 빗물을 누적한다. (만약 min 값보다 모두 크거나 같은 경우 무시한다.)
  const min = Math.min(start[0], next);

  for (let j = start[1] + 1; j < i; j++) {
    if (input[j] < min) {
      rain += min - input[j];
      input[j] = min;
    }
  }

  // 만약 지금까지의 블록 높이보다 더 큰 블록이 나타나면 갱신해 준다.
  if (start[0] < next) {
    start = [next, i];
  }
}

console.log(rain);
