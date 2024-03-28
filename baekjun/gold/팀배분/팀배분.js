const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map(a => a.split(" ").map(Number));

// 싫어하는 사람을 담을 그래프 배열 (양방향)
const graph = Array.from({length: N+1}, () => []);

for(let i = 1 ; i <= N ; i++) {
    for(let j = 1 ; j <= arr[i-1][0] ; j++) {
        graph[i].push(arr[i-1][j]);
    }
}

// 팀 배분의 경우 이분 그래프로 한다. (두 개의 집합)
const A = [];
const B = [];

// 방문 여부를 판단할 체크 배열
const visited = Array.from({length: N+1}, () => false);

for(let i = 1 ; i <= N ; i++) {
    if(visited[i]) continue;
    
    const queue = [[i, "A"]];
    visited[i] = true;
    A.push(i);
    
    while(queue.length) {
        const [num, team] = queue.shift();
        
        for(let k = 0 ; k < graph[num].length ; k++) {
            const next = graph[num][k];
            
            if(visited[next]) continue;
            
            if(team === "A") {
                B.push(next);
                
            } else {
                A.push(next);
            }
            
            queue.push([next, team === "A" ? "B" : "A"]);
            visited[next] = true;
        }
    }
}

console.log(A.length);
console.log(A.sort((a,b) => a - b).join(" "));
console.log(B.length);
console.log(B.sort((a,b) => a - b).join(" "));