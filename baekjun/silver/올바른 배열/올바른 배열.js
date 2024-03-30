const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');

input.shift();
const arr = [...new Set(input)].map(Number).sort((a,b) => a-b);

let left = 0;
let right = arr.length - 1;

let answer = 1;

while(left <= right) {
    let count = 1;
    
    for(let i = left+1 ; i <= right ; i++) {
        if(arr[left] + 4 >= arr[i]) {
            count++;
        } else {
            break;
        }
    }
    
    left++;
    answer = Math.max(answer, count);
}

if(answer >= 5) {
    console.log(0);
} else {
    console.log(Math.abs(answer - 5))
}