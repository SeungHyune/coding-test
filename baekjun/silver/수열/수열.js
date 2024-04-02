const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,K], [...arr]] = input.map(a => a.split(" ").map(Number));

let answer = Number.MIN_SAFE_INTEGER;
let temp = arr[0];
let repeat = 1;
let left = 0;
let right = 0;


while(right < N) {
    if(K < repeat) {
        temp -= arr[left];
        left++;
        repeat--;
    } else if(K > repeat) {
        right++;
        temp += arr[right];
        repeat++;
    }
    
    if(repeat === K) {
        if(answer < temp) {
            answer = temp;
        }
        right++;
        repeat++;
        temp += arr[right]
    }
}

console.log(answer)