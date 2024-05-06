const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("")

function solution(input) {
    const queue = [];
    
    for(const a of input) {
        if(a === "(" || a === "[") {
            queue.push(a)
        } else {
            let pop = queue.pop();
            if(a === ")") {
                let number = 0;
                
                while(typeof pop === "number") {
                    number += pop;
                    pop = queue.pop();
                }
                
                if(pop === "(") {
                    // 2
                    if(number) {
                        queue.push(number * 2);
                    } else {
                        queue.push(2);
                    }
                } else {
                    return 0;
                }
            } else if (a === "]") {
                let number = 0;
                
                while(typeof pop === "number") {
                    number += pop;
                    pop = queue.pop();
                }
                
                if(pop === "[") {
                    if(number) {
                        queue.push(number * 3);
                    } else {
                        queue.push(3)
                    }
                } else {
                    return 0;
                }
            }
        }
    }
    
    if(queue.includes("(") || queue.includes("[")) return 0
    
    return queue.reduce((prev, cur) => prev + cur , 0)
}

console.log(solution(input));