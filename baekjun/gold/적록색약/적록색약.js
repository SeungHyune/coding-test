const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = input.shift();
const arr = input.map(a => a.split(""));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0 ,-1];

function bfs (divide) {
		// 방문한 그룹을 체크할 변수
    let area = 0;
    
    // 방문을 체크할 배열
    const visited = Array.from({ length: N }, () => Array.from({ length: N }).fill(false));

    for(let i = 0 ; i < N ; i++) {
        for(let j = 0 ; j < N ; j++) {
            if(visited[i][j]) {
                continue;
            }
            
            area++;
            
            let color = arr[i][j];
            
            // 적록색약인 경우에만 G을 R로 변경
            if(divide === "RB" && arr[i][j] === "G") {
                color = "R";
            }
            
            const queue= [[i,j,color]];
            visited[i][j] = true;
            
            while(queue.length) {
                const [x,y,color] = queue.shift();
                
                for(let k = 0 ; k < 4 ; k++) {
                    const dx = x + nx[k];
                    const dy = y + ny[k];
                    
                    if(dx < 0 || dy < 0 || dx >= N || dy >= N) continue;
                    
                    if(visited[dx][dy]) continue;
                    
                    // 적록색약인 경우 R, G을 모두 R로 통일
                    let rb = (arr[dx][dy] === 'R' || arr[dx][dy] === 'G') ? 'R' : 'B';
                    
                    // 적록색약이 아닌 사람 체크
                    if(divide === 'RGB' && color === arr[dx][dy]) {
                        visited[dx][dy] = true;
                        queue.push([dx,dy,color]);
                    }
                    
     
                    // 적록색약인 사람 체크
                    if(divide === 'RB' && color === rb) {
                        visited[dx][dy] = true;
                        queue.push([dx,dy,color])
                    }
                }
            }
        }
    }
    
    return area;
}

console.log(bfs("RGB"), bfs("RB"));