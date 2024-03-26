# DFS와 BFS

[문제 링크](https://www.acmicpc.net/problem/1260)

### 문제설명

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

<br>

### 입력

첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

<br>

### 출력

첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

<br>

### 예제

```jsx
// 예제 1
4 5 1
1 2
1 3
1 4
2 4
3 4

// 예제 출력 1
1 2 4 3
1 2 3 4
```

<br>

### 📕 문제 포인트

1. DFS, BFS를 사용하여 정점의 개수를 모두 방문한 경우 (방문한 정점의 개수가 N인 경우) 혹은 모든 정점을 방문한 경우 (시작 정점에서 갈 수 있는 정점이 없는 경우에는 시작 정점만 출력하게 됩니다.)
2. DFS, BFS 탐색을 시작한다. (이때, visited 배열을 통해 이미 방문한 정점은 방문하지 않습니다.)
3. 또한 정점에서 갈 수 있는 정점의 가장 작은 수 부터 방문합니다. (저의 경우 sort 메서드를 사용하여 정렬한 후 방문했습니다.)

```js
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
```