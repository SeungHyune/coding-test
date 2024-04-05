const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,S], [...arr]] = input.map(a => a.split(" ").map(Number));

let [answer, flag] = [Number.MAX_SAFE_INTEGER, false];
let [left, point] = [0, 0];

let sum = arr[point];

while(point < N) {
    // 연속 수열의 합이 S 이상인 경우
    // 현재 연속 부분 수열의 수를 현재까지 연속 부분 수열의 수와 비교하여 최솟값을 answer에 담습니다.
    // 이후 현재 arr[left] 값을 합산한 sum 변수에서 빼주고 left 값을 + 1 늘려줍니다.
    if(sum >= S) {
        flag = true;
        answer = Math.min(answer, point + 1 - left);
        sum -= arr[left];
        left++;;
    } else {
      // 만약 연속 수열의 합이 S 미만인 경우 더 큰 수가 필요함으로 point 값을 + 1 늘려주고 arr[point] 값을 sum에 더해줍니다.
        point++;
        sum += arr[point];
    }
}

if(flag === false) {
    console.log(0);
    return;
}
console.log(answer);