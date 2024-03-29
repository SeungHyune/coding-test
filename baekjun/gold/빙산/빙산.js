const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [[N,M], ...arr] = input.map(a => a.split(" ").map(Number));

let total = arr.flatMap(a => a).reduce((prev,cur) => prev + cur, 0);

const nx = [1,0,-1,0];
const ny = [0,1,0,-1];

let year = 0;

while(total) {
    let mount = 0;

    const visited = Array.from({length: N}, () => Array.from({length: M}).fill(false));
    const copy = JSON.parse(JSON.stringify(arr));
    
    
    for(let i = 0 ; i < N ; i++) {
        for(let j = 0 ; j < M ; j++) {
            if(arr[i][j] === 0 || visited[i][j]) continue;
            
            mount++;
  
            if(mount === 2 && !visited[i][j]) return console.log(year);
            
            const queue = [[i,j]];
            visited[i][j] = true;
            
            while(queue.length) {
                const [x,y] = queue.shift();
                
                for(let k = 0 ; k < 4 ; k++) {
                    const dx = x + nx[k];
                    const dy = y + ny[k];
                    
                    if(dx < 0 || dy < 0 || dx >= N || dy >= M) continue;
                    
                    if(copy[x][y] > 0 && arr[dx][dy] === 0) {
                        copy[x][y] -= 1;
                        total -= 1;
                    }
                    
                    if(arr[dx][dy] > 0 && !visited[dx][dy]) {
                        queue.push([dx,dy]);
                        visited[dx][dy] = true
                    }
                }
                
             
            }
        }
    }
    
    arr = copy;
    
    year++;
}

console.log(0)