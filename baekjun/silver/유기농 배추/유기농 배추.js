const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = input.shift();

const array = [];

let count = 0;

for(let i = 0 ; i < N ; i++) {
    const shift = input.splice(count, 1).join(" ").split(" ").map(Number);
    const arr = [shift];
    const [N,M,K] = shift;
    const map = Array.from({ length:M  }, () => Array.from({ length:N }, () => 0));

    let max = count + K;
    

    
    for(let j = count ; j < max ; j++) {
        const [x, y] = input[j].split(" ").map(Number);
        map[y][x] = 1;
        count = j+1;    
    }
    array.push(map);
}

const nx = [-1,0,1,0];
const ny = [0,1,0,-1];

array.forEach(arr => {
    let result = 0;
  
    for(let i = 0 ; i < arr.length ; i++) {
        for(let j = 0 ; j < arr[i].length ; j++) {
            if(arr[i][j] === 1) {
                result++;
                arr[i][j] = 0;
                const queue = [[i,j]];
                while(queue.length > 0) {
                    const [x, y] = queue.shift();
                    for(let k = 0 ; k < 4 ; k++) {
                        const dx = x + nx[k]
                        const dy = y + ny[k]
                        if(dx >= 0 && dx < arr.length && dy >= 0 && dy < arr[0].length) {
                            if(arr[dx][dy] === 1) {
                                queue.push([dx,dy]);
                                arr[dx][dy] = 0;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(result)
})

