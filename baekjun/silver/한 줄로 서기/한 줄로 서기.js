// 가장 작은 숫자부터 차례대로 넣는다.
// 들어간 번호의 인덱스를 담는다.
// 인덱스가 담긴 배열과 현재 인덱스와 비교하여 현재 인덱스보다 큰 사람이 몇 명인지 확인한다.

// ex) 2 1 1 0
// ex) 3 1 0 2

// ex) 6 1 1 1 2 0 0
// ex) 6 2 3 4 7 5 1

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());
const [arr] = input.map((a) => a.split(" ").map(Number));

const result = [];

while (result.length < N) {
  let flag = false;

  for (let i = 0; i < arr.length; i++) {
    const len = arr[i];

    if (flag || result.length < len || len === -1) continue;

    let big = 0;
    for (let j = 0; j < result.length; j++) {
      let index = result[j];

      if (index > i + 1) {
        big++;
      }
    }

    if (big === len) {
      result.push(i + 1);
      arr[i] = -1;
      flag = true;
    }
  }
}

console.log(result.join(" "));
