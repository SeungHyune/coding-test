const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [...arr]] = input.map(a => a.split(" ").map(Number));

let [left, right] = [0, N-1];
let [sum, answer] = [Number.MAX_SAFE_INTEGER, []];

while(left < right) {
    const diff = arr[right] + arr[left];
    
    if(sum >= Math.abs(diff)) {
        sum = Math.abs(diff);
        answer = [arr[left], arr[right]];
    }
    
    if(diff < 0) {
        left++;
    } else {
        right--;
    }
}

console.log(answer.join(" "))