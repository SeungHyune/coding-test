// 임의의 막걸리ml를 mid으로 정한다.
// 모든 사람들에게 랜덤으로 배정된 막걸리 용량을 mid로 나누어 나눠줄 수 있는 사람들의 수를 찾는다.
// 만약 count가 K 사람 이상에게 나눠줄 수 있다면 해당 mid 값으로 막걸리를 나눠줄 수 있다.
// => 해당 ml를 answer에 저장하고, 더 큰 용량으로 나눠줄 수 있는지 찾는다.
// 만약 count가 K 사람 보다 작다면 해당 mid 값으로 막걸리를 나눠줄 수 없기 때문에 더 작은 ml 값을 탐색한다.
// => end 값을 mid - 1로 수정하여 ml 값을 낮춘다.

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);

const arr = input.map(Number);

let [start, end] = [0, 2147483647];
let answer;
while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let count = 0;

  for (const a of arr) {
    count += Math.floor(a / mid);
  }

  if (count >= K) {
    start = mid + 1;
    answer = mid;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
