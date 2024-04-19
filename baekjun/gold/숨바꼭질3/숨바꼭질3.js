const fs = require("fs");
let input  = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N,K] = input.join(" ").split(" ").map(Number);

function solution(N, K) {
    const visited = Array.from({ length :  100001 }, () => Infinity);
    
    if(N === K) return 0;
    
    const queue = [N];
    
    visited[N] = 0;
    
    while(queue.length > 0) {
        const x = queue.shift();
        
        for(const nx of [x-1, x+1, x*2]) {
            if(nx > 100000 || nx < 0) continue;
            
            // 한 번도 방문하지 않은 경우
            if(visited[nx] === Infinity) {
                if(x * 2 === nx) {
                    visited[nx] = visited[x];
                    queue.push(nx);
                } else {
                    visited[nx] = visited[x] + 1;
                    queue.push(nx);
                }
            } else {
            // 한 번이라도 방문한 경우
                if(x * 2 === nx) {
                    if(visited[nx] > visited[x]) {
                        visited[nx] = visited[x];
                        queue.push(nx);
                    }
                } else {
                    if(visited[nx] > visited[x] + 1) {
                        visited[nx] = visited[x] + 1;
                        queue.push(nx);
                    }
                }
            }
        }
    }
    
    return visited[K]
}

console.log(solution(N, K));