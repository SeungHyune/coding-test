const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const findArr = input.map(a => a.split(" ").map(Number));

const [N, M] = findArr.shift();
const node = findArr.splice(0, N-1);

const arr = Array.from({length: N+1}, () => Array.from({length: N+1}).fill(0));
for(const [x, y, d] of node) {
    arr[x][y] = d;
    arr[y][x] = d;
}

findArr.map((node) => {
    const [node1, node2] = node;
    const ch = Array.from({length: N+1}, () => 0);
    
    
        for(let j = 1 ; j <= N ; j++ ) {
            if(arr[node1][j] === 0) continue;
            
            const d = arr[node1][j];
            ch[j] = d;
            const queue = [[node1,j,d]];
            
            while(queue.length) {
                const [x, y, d] = queue.shift();
                
                for(let k = 1 ; k <= N ; k++) {
                    if(arr[y][k] === 0) continue;
                    const distance = d + arr[y][k];
                    
                    if(ch[k] === 0 || ch[k] > 0 && ch[k] > distance) {
                        queue.push([y, k, distance]);
                        ch[k] = distance
                    }
                }    
            }
            
        }

    console.log(ch[node2]);
})
