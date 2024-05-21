const fs = require("fs");
let input = fs.readFileSync('/dev/stdin').toString().trim();
const N = Number(input);

const number = [1, 5, 10, 50];

function solution(N) {
    let romeNumber = [1, 5, 10, 50]
    
    let cnt = 1;
    while(cnt < N) {
        const arr = [];
        number.forEach((num, index) => {
            for(let i = index ; i < romeNumber.length ; i++) {
                arr.push(num + romeNumber[i]);
            }
        })

        romeNumber = [...new Set(arr)];
        
        cnt++;
    }
    
    return romeNumber.length
}

console.log(solution(N));