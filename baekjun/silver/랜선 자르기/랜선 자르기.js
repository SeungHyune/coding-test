// 가지고 있는 랜선의 K개수로 동일한 길이의 랜선 N를 만들어야 한다.
// 이떄, 동일한 길이를 최대로 하여 N개 랜선을 만든다. 최대 길이는 몇인가?

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [K, N] = input.shift().split(" ").map(Number);
const arr = input.map(Number);

let [start, end] = [1, 2147483647];
let answer;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let result = 0;
  arr.forEach((len) => {
    const lenth = Math.floor(len / mid);

    result += lenth;
  });

  if (result >= N) {
    answer = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
