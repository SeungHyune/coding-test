const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [len, ...arr] = input.map(a => a.split(" ").map(Number));
const [N,M] = len;

const nx = [-1,-1,0,1,1,1,0,-1];
const ny = [0,1,1,1,0,-1,-1,-1];

const ch = Array.from({length: N}, () => Array.from({length: M}).fill(false));
let result = 0;

for(let i = 0 ; i< N ; i++) {
    for(let j = 0 ; j < M ; j++) {
        if(!ch[i][j]) {
            let isMaxNum = true;
            
            ch[i][j] = true;
            
            const queue = [[i,j]]
            
            while(queue.length) {
                const [x, y] = queue.shift();
                
                for(let k = 0 ; k < 8 ; k++) {
                    const dx = x + nx[k];
                    const dy = y + ny[k];
                    
                    if(dx < 0 || dy < 0 || dx >= N || dy >= M) continue;
                    
                    
                    if(arr[x][y] < arr[dx][dy]) {
                        isMaxNum = false;
                    }
                    
                    if(ch[dx][dy]) continue;
                    
                    if(arr[x][y] === arr[dx][dy]) {
                        ch[dx][dy] = true;
                        queue.push([dx,dy]);
                    }
                }
            }
            
            if(isMaxNum) {
                result++;
            }
        }
    }
}




console.log(result);