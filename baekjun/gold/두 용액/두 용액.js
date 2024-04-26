// 산성 용액 = 양의 정수 (1부터 10억)
// 알칼리성 용액 = 음의 정수 (-1부터 -10억)
// 같은 양의 두 용액을 혼합하여 0에 가장 가까운 용액을 만들려고 한다.

// 두 종류의 산성 용액 혹은 알칼리성 용액으로만 0에 가장 가까운 혼합 용액을 만드는 경우도 있다.
// 가장 0에 까가운 혼합 용액을 오름차순으로 출력하라

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [[N], [...arr]] = input.map(a => a.split(" ").map(Number));

arr.sort((a,b) => a - b);

function solution() {
    let [answer, result] = [Number.MAX_SAFE_INTEGER, []];
    let [left, right] = [0, N-1];
    
    while(left < right) {
        const sum = arr[right] + arr[left];
        const abs = Math.abs(sum);
        
        if(answer > abs) {
            answer = abs;
            result = [arr[left], arr[right]]
        }
        
        if(abs === 0) return result.join(" ");
        
        
        if(sum < 0) {
            left++;
        } else {
            right--;
        }
    }
    
    return result.join(" ")
}

console.log(solution());