const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();

const N = Number(input);
let answer = 1;

// 이중 for문을 통해 쉽게 구현할 수 있다.
// 가장 먼저 i는 1부터 시작하며 1부터 구하려는 수(N)까지 반복한다.
for(let i = 1 ; i < N ; i++) {
    let sum = i
    for(let j = i+1 ; j < N ; j++) {
    // 이후 i를 초깃값으로 한 sum 변수에 j를 반복하여 더한다.
		// 이때 sum 값이 N과 같으면 answer++ 후 반복문을 종료한다.
		// sum 값이 N보다 커진다면 즉시 반복문을 종료한다.
        sum += j;
        if(sum > N) break;
        if(sum === N) {
            answer++;
            break;
        }
    }
}

console.log(answer)