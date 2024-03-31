const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N],[M],[...arr]] = input.map(a => a.split(" ").map(Number));

// 가장 큰 수, 가장 작은 수를 찾아야 하므로 정렬해 준다.
arr.sort((a, b) => a - b);

// 가장 작은 수를 가리키는 포인터 저장
let left = 0;

// 가장 큰 수를 가리키는 포인터 저장
let right = N - 1;

// 갑옷의 수
let count = 0;

while(left < right) {
    if(arr[left] + arr[right] === M) {
        // 두 재료의 합이 M과 정확히 일치하면
        count++;
        left++;
        right--;
    } else if(arr[left] + arr[right] > M) {
		    // 두 재료의 합이 M 보다 크다면 더 작은 수가 필요하므로
        right--
    } else if(arr[left] + arr[right] < M) {
		    // 두 재료의 합이 M 보다 작다면 더 큰 수가 필요하므로
        left++
    }
}

console.log(count)