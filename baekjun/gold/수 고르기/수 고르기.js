const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N,M] = input.shift().split(" ").map(Number);
const arr = input.map(a => Number(a));

// 오름차순 정렬
arr.sort((a,b) => a - b);

// 가장 큰 수부터 차례대로 검사
let left = N - 2;
let right = N - 1;

let answer = Number.MAX_SAFE_INTEGER;

while(right > 0) {
    if(left === -1) break;
    
    const sub = Math.abs(arr[left] - arr[right]);
    
    // 두 수의 차이가 M 이상인 경우
    // left, right 모두 현재 포인트에서 -1 해줬습니다.
    if(M <= sub) {
        if(answer > sub) {
            answer = sub;
        }
        
        if(sub === M) {
            break;
        }
        
        right--;
        left = right - 1;
    } else {
    // 두 수의 차이가 M 미만인 경우
    // 더 작은 수와의 차이를 비교해야 하므로 left 값만 -1 해줬습니다.
        left--;
    }
}

console.log(answer);