const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, B] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, B, max, min) {
  let answer = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

  for (let i = min; i <= max; i++) {
    let time = 0;
    let b = B;
    for (let n = 0; n < N; n++) {
      for (let m = 0; m < M; m++) {
        const sum = Math.abs(arr[n][m] - i);
        if (arr[n][m] < i) {
          b -= sum;
          time += sum;
        } else if (arr[n][m] > i) {
          b += sum;
          time += sum * 2;
        }
      }
    }

    if (b < 0) {
      continue;
    }
    if (answer[0] >= time) {
      answer = [time, i];
    }
  }

  return answer.join(" ");
}

const flatMap = arr.flatMap((v) => v);
const max = Math.max(...flatMap);
const min = Math.min(...flatMap);

console.log(solution(N, M, B, max, min));
