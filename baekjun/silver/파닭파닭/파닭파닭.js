const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [S, C] = input.shift().split(" ").map(Number);
const arr = input.map(Number);

let [start, end] = [1, 1000000000];

let answer = 0;
while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let len = 0;
  let result = 0;

  for (const a of arr) {
    const l = Math.floor(a / mid);
    len += l;

    const postiveNumber = a - mid * l;

    if (postiveNumber > 0) {
      result += postiveNumber;
    }
  }

  if (len >= C) {
    // 현재 파(mid)의 양을 치킨에 넣을 수 있음

    if (len > C) {
      // 만들려는 파닭을 초과한 경우 해당 파는 라면에 넣는다.
      result += mid * (len - C);
    }

    answer = result;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
