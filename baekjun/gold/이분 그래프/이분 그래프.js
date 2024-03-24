const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const graphArr = input.reverse().map(a => a.split(" ").map(Number));
const [N] = graphArr.pop();

const arr = []

while(graphArr.length) {
    const [V, E] = graphArr.pop();
    const array= [[V,E]];    

    for(let i = 0 ; i < E ; i++) {
        array.push(graphArr.pop());
    }
    
    arr.push(array);
}

arr.forEach(array => {
    let answer= 'YES'
    const [V, E] = array.shift();
    
    const graph = Array.from({length: V + 1}, () => []);
    const visited = Array.from({length: V + 1}, () => false);
    
    for(let i = 0; i < E ; i++) {
        const [x,y] = array[i];
        graph[x].push(y);
        graph[y].push(x);
    }
    
    
    for(let i = 1 ; i < V+1 ; i++) {
        if(graph[i].length && !visited[i]) {
            visited[i] = 'A';
            
            const queue = [[i, "A"]];
            
            while(queue.length) {
                const [N, AB] = queue.shift();
                
                const BA = AB === 'A' ? 'B' : 'A';
                
                for(let k = 0 ; k < graph[N].length; k++) {
                    const num = graph[N][k];
                    
                    if(!visited[num]) {
                        queue.push([num, BA]);
                        visited[num] = BA;
                    } else if(visited[num] !== BA) {
                        answer = 'NO';
                        break;
                    }
                }
            }
        }
    }
    
    console.log(answer);
})