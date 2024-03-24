const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [A,B,C] = input[0].split(" ").map(Number)

const visited = Array.from({ length: 201}, () => Array.from({length: 201}, () => Array.from({length: 201}, () => false)));

const queue = [[0,0,C]];

const result = [];

while(queue.length > 0) {
    const [x, y, z] = queue.shift();
    
    if(!visited[x][y][z]) {
        
        visited[x][y][z] = true;
        
        if(x === 0) result.push(z);
        
        // x => y
        if (x + y > B) {
            queue.push([x+y-B, B, z]);
        } else {
            queue.push([0, x+y, z]);
        }
        
        // x => z
        if (x + z > C) {
            queue.push([x+z-C, y, C]);
        } else {
            queue.push([0, y, x+z]);
        }
        
        // y => x
        if (y + x > A) {
            queue.push([A,y+x-A,z]);
        } else {
            queue.push([y+x, 0, z]);
        }
        
        // y => z
        if (y + z > C) {
            queue.push([x,y+z-C,C]);
        } else {
            queue.push([x,0,y+z]);
        }
        
        // z => x
        if (z+x > A) {
            queue.push([A,y,z+x-A]);
        } else {
            queue.push([z+x,y,0]);
        }
        
        // z => y
        if (z+y > B) {
            queue.push([x,B,z+y-B]);
        } else {
            queue.push([x,z+y,0]);
        }

    }
}

console.log(result.sort((a,b) => a - b).join(" "))