const fs = require("fs");
let input  = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [[N], [...arr]] = input.map(a => a.split(" ").map(Number));

// 오름차순 정렬
arr.sort((a, b) => a - b);

let answer = 0;

for(let i = 0 ; i < N ; i++) {
		// 찾을 숫자를 변수에 담습니다.
    const findNumber = arr[i];
    // 자기 자신을 제외한 배열 리스트를 만듭니다.
    const findArr = arr.slice(0, i).concat(arr.slice(i + 1));
    
    let left = 0;
    let right = findArr.length - 1;
    
    while(left < right) {
        const sum = findArr[left] + findArr[right];
        
        // 두 수의 합이 찾는 숫자와 같다면 즉시 반복문을 종료합니다.
        if(sum === findNumber) {
            answer++;
            break;
        }
        
        // 두 수의 합이 찾는 숫자 보다 작다면 더 큰 수가 필요하므로 left 값을 ++합니다.
        if (sum < findNumber) {
            left++;
        } else {
        // 두 수의 합이 찾는 수자 보다 크면 더 작은 수가 필요하므로 right 값을 --합니다.
            right--;
        }
    }
}

console.log(answer)