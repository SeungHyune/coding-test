const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[C,N], ...arr] = input.map(v => v.split(' ').map(Number))

function solution(C,N,arr) {
    let answer = Number.MAX_SAFE_INTEGER;
    const dp = Array.from({length: 100001}, () => 0);
    
    for(let i = 0 ; i < N ; i++) {
				// c = 비용
				// n = 비용에 따른 모집 고객 수
        const [c, n] = arr[i];
        for(let j = c; j < dp.length; j++) {
						// 현재 dp[j] 값과 현재 비용을 뺀 값 + 현재 비용으로 모집할 수 있는 고객을 비교하여 더 큰 값을 dp[j]에 넣습니다.
            dp[j] = Math.max(dp[j], dp[j-c] + n)
            
						// dp에 고객을 C명이상 모집한 경우 - 탈출 조건 발동
            if(dp[j] >= C) {
							answer = Math.min(answer, j)
							continue;
						}
        }
    }
    
    return answer;
}

console.log(solution(C,N,arr))