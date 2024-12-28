// N일 동안 N개의 맥주를 마시면서 선호도의 합 M을 채울 수 있도록 간 레벨을 강화해야한다.
// 이때, 간 레벨을 최솟값으로 강화하자 (간 레벨을 강화하는 비용이 비쌈)

// N - 축제 기간 / M - 선호도 합 / K 맥주 종료의 수
// [맥주의 선호도, 도수 레벨]

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M, K], ...arr] = input.map((a) => a.split(" ").map(Number));

// K종류의 맥주 중 최고 도수의 맥주를 구하기 위한 정렬
arr.sort((a, b) => a[1] - b[1]);

const maxLike = arr.at(-1)[1];
let [start, end] = [1, maxLike];

// N일 동안 선호도가 높은 순서로 맥주를 마시기 위한 정렬 (선호도가 같다면, 도수 레벨이 낮은순으로 정렬)
arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  }

  return b[0] - a[0];
});

let answer = -1;

while (start <= end) {
  const mid = Math.floor((start + end) / 2); // 임의의 간 레벨

  let likeCount = 0;
  let day = 0;
  for (const [like, level] of arr) {
    if (level <= mid) {
      likeCount += like;
      day++;
    }

    if (day === N) {
      break;
    }
  }

  if (likeCount >= M && day === N) {
    // mid 레벨로 맥주를 N 종류의 M 선호도 이상 마실 수 있는 경우
    // 최솟값을 구해야함
    answer = mid;
    end = mid - 1;
  } else {
    // 불가능한 경우
    start = mid + 1;
  }
}

console.log(answer);
