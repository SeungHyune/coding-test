const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = input[0];
const arr = input.slice(1)[0].split(" ").map(Number);

function solution() {
    let [answer, sum] = [0, 0];
    let [left, right] = [0, 0];
    let flag = true;
    
    const map = new Map();
    
    while(left < N) {
			  // 중복된 숫자 체크
        const mapCheck = map.has(arr[right]);
        
        // left 값이 바뀐 뒤 초깃값 세팅
        if(flag) {
            flag = false;
            
            // left가 0인 경우 음수가 나오므로 처음에는 패스해 준다.
            if(left > 0) {
                sum = right - left;
            }
        }
        
        // map 메서드에 중복된 숫자가 있거나 right 값이 배열을 벗어난 경우
        if(mapCheck || right >= N) {
            map.delete(arr[left]);
            left++;
            flag = true;
            answer += sum;
        } else {
        // 중복된 숫자가 없는 경우
            map.set(arr[right], 1);
            right++;
            sum++;
        }
    }
    
    
    return answer;
}

console.log(solution());