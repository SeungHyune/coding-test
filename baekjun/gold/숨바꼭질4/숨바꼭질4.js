const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input.join(" ").split(" ").map(Number);

function solution(N, K) {
    const queue = [N];
    // 시간과 이전 경로를 담을 visited 배열
    const visited = Array.from({length: 100001}, () => [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    let index = 0;
    visited[N][0] = 0;
    visited[N][1] = N;
    
    while(queue.length > index) {
        const x = queue[index++];
        
        for(const nx of [x-1, x+1, x*2]) {
		        // 0부터 100000까지만 탐색하고 다른 수인 경우 예외 처리
            if(nx < 0 || nx > 100000) continue;
            
            // 기존 경로를 이미 방문했고 방문한 시간이 더 짧은 경우 예외 처리
            if(visited[nx][0] < visited[x][0] + 1) continue;
            
            // 이전 경로를 담습니다.
            visited[nx][1] = x;
            // 현재까지 이동한 시간을 담습니다.
            visited[nx][0] = visited[x][0] + 1;
            
            // K 위치가 아닌 경우에만 queue에 다음 경로를 push 합니다.
            if(nx !== K) {
                queue.push(nx);
                
            }
        }
    }
    
    // K에 담긴 이전 경로부터 역순으로 시간만큼 반복하여 result에 이전 경로를 담습니다.
    const result = [K];
    // 이전 경로로 count를 계속 교체해 주어 이전 경로로 이동하도록 사용될 변수
    let count = K;
    
    for(let i = visited[K][0] ; i > 0 ; i--) {
        const value = visited[count][1];
        count = value;
        result.push(value);
    }
    
    console.log(visited[K][0])
    console.log(result.reverse().join(" "))
}

solution(N,K)