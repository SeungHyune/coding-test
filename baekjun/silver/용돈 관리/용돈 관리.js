const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map(Number);

let [start, end] = [1, 100000 * 10000];

let answer;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let money = mid;
  let count = 0;
  let flag = false;

  for (const a of arr) {
    if (money >= a) {
      money -= a;
    } else {
      if (mid < a) {
        // 애초에 K 금액으로 하루를 사용하지 못하는 금액
        flag = true;
      }

      count++;
      money = mid - a;
    }
  }

  if (count <= M - 1 && flag === false) {
    end = mid - 1;
    answer = mid;
  } else {
    start = mid + 1;
  }
}

console.log(answer);
