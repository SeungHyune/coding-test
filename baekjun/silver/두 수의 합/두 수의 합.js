const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const x = Number(input.pop());
const [[N], [...arr]] = input.map(a => a.split(" ").map(Number));

// 오름차순 정렬해 줍니다.
arr.sort((a,b) => a - b);

let answer = 0; 
let [left, right] = [0, N - 1];

while(left < right) {
		// 두 쌍의 합을 구합니다.
    const sum = arr[left] + arr[right];
    
    // sum과 x가 같은 경우 동일한 정수가 없으므로 left++, right-- 시켜 줍니다.
    if(sum === x) {
        answer++;
        left++;
        right--;
    } else if(sum < x) {
    // sum이 x보다 작은 경우 더 큰 수를 찾아야 하므로 left 값을 증가시켜줍니다.
        left++;
    } else if(sum > x) {
    // sum이 x보다 큰 경우 더 작은 수를 찾아야 하므로 right 값을 감소시켜 줍니다.
        right--;
    }
}

console.log(answer)