// DFS, BFS로 푼다.
// 정점의 개수 N, 간선의 개수 M, 시작 정점 번호 V
// 양방향 그래프
// 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 없는 경우 종료한다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,M,V], ...arr] = input.map(a => a.split(" ").map(Number));

const graph = Array.from({length: N+1}, () => []);

for(const [x,y] of arr) {
    graph[x].push(y);
    graph[y].push(x);
}


const dfsVisited = Array.from({length: N+1}, () => false);
dfsVisited[V] = true;
const dfsResult = [V];

function dfs (start) {
    graph[start].sort((a,b) => a-b);
    
    if(dfsResult.length === N) {
        return 
    } else {
        for(let k = 0 ; k < graph[start].length; k++) {
            const move = graph[start][k];
            
            if(!dfsVisited[move]){
                dfsVisited[move] = true;
                dfsResult.push(move);
                dfs(move);
                
            }
        }
    }
}


function bfs(start) {
    const result = [start];
    const visited = Array.from({length: N + 1}, () => false);
    visited[start] = true;
    const queue = [[start]];
    
    while(queue.length && result.length !== N) {
        const [x] = queue.shift();
        
        graph[x].sort((a,b) => a-b);
        
        for(let k = 0; k < graph[x].length; k++) {
            const move = graph[x][k];
            
            if(visited[move]) continue;
        
            queue.push([move]);
            result.push(move);
            visited[move] = true;
        }
    }
    
    return result
}

dfs(V);
console.log(dfsResult.join(" "));
console.log(bfs(V).join(" "));

