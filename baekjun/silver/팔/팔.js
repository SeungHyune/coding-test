const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

function solution() {
    let [answer, count] = [0, 0];
    const [first, second] = input
    
    if(first.length !== second.length) return 0
    
    for(let i = 0 ; i < first.length; i++) {
        const firstValue = first[i];
        const secondValue = second[i];
        
        // 값이 서로 같으면서 지금까지 자릿수가 같은 경우 중 값이 8이면 answer 증가
        if(firstValue === secondValue && firstValue === "8" && count === i) {
              answer++;
              count++
        } else if(firstValue === secondValue) {
              count++
        }
    }
    
    return answer
}

console.log(solution())