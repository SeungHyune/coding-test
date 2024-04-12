const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

// 오름차순 정렬
arr.sort((a, b) => a - b);

// 초깃값 설정
let [answer, result] = [[], Number.MAX_SAFE_INTEGER];
let [start, left, right] = [0, 1, N - 1];

while (start < N) {
  // left, right 값 초기화
  left = start + 1;
  right = N - 1;

  while (left < right) {
    const sum = arr[start] + arr[left] + arr[right];
    const absolute = Math.abs(sum);

    // 0과 더 가까운 값을 찾은 경우
    if (result > absolute) {
      result = absolute;
      answer = [arr[start], arr[left], arr[right]];
    }

    // 0을 찾은 경우 바로 종료
    if (absolute === 0) {
      return console.log(answer.join(" "));
    }

    // 음수인 경우 0과 가까운 더 큰 값을 찾기 위해 left 값 증가
    if (sum < 0) {
      left++;
    } else {
      // 양수인 경우 0과 가까운 더 작은 값을 찾기 위해 right 값 감소
      right--;
    }
  }

  start++;
}

return console.log(answer.join(" "));
