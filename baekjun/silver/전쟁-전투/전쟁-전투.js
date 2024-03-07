const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [size, ...arr] = input;
const [N,M] = size.split(" ").map(Number);
const map = arr.map(a => a.split(""));

const dx = [-1,0,1,0];
const dy = [0,1,0,-1];

// 아군 = W, 적군 = B
const answer = {
    W: 0,
    B: 0
}

for(let i = 0 ; i < M ; i++) {
    for(let j = 0 ; j < N ; j++) {
        if(!map[i][j]) continue;
        
        let WB = "";
        let result = 1;
        if(map[i][j] === "W") WB = "W";
        else if(map[i][j] === "B") WB = "B";
        
        
        
        const queue = [[i,j,WB]]
        map[i][j] = false;
        
        while(queue.length) {
            const [x,y,WB] = queue.shift();
            
            for(let k = 0 ; k < 4 ; k++) {
                const nx = x + dx[k];
                const ny = y + dy[k];
                if(nx < 0 || nx >= M || ny < 0 || ny >= N) {
                    continue;
                }
                
                if(map[nx][ny] === WB) {
                    result++;
                    queue.push([nx,ny,WB]);
                    map[nx][ny] = false;
                        
                }
            }
        }
        
        
        if(result >= 1) {
            answer[WB] += Math.pow(result, 2);
        }
    }
}

console.log(`${answer["W"]} ${answer["B"]}`)