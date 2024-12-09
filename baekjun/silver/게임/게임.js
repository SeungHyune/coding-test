// 형택이의 게임횟수 X, 이긴횟수 Y가 주어질 때
// 현재 승률이 변하려면 몇 번 더 이겨야 하는지 승리의 최솟값을 구해라
// 앞으로 진행하는 게임은 무조건 승리한다.

// 전체 게임 횟수 : 88
// 지금까지 이긴 횟수 : 50
// 현재 승률 : Math.floor((50 / 88) * 100) = 56
// 56 => 57 되려면 몇 번 더 게임을 진행해야 하는가? (모든 게임은 무조건 이긴다.)
// 정답 : 1 => Math.floor((51 / 88) * 100) = 57

const fs = require("fs");
const [X, Y] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")[0]
  .split(" ")
  .map(Number);
const Z = Math.floor((Y * 100) / X); // 현재 승률

let [start, end] = [1, 1000000000];
let mid = Math.floor((start + end) / 2);

let min = -1;

while (start <= end && mid <= 1000000000) {
  mid = Math.floor((start + end) / 2);

  const newZ = Math.floor(((Y + mid) * 100) / (X + mid));

  if (Z < newZ) {
    // 승률 상승 했기 때문에 더 작은 경기수를 찾아야함
    end = mid - 1;
    min = mid;
  } else {
    // 승률 그대로이기 때문에 더 많은 경기를 해야함
    start = mid + 1;
  }
}

console.log(min);
