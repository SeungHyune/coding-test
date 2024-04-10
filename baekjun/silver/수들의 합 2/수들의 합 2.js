const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,M], [...arr]] = input.map(a => a.split(" ").map(Number));

let [left, right] = [0,0];
let [sum, answer] = [0,0];

while(right <= N) {
    if(sum >= M) {
        if(sum === M) {
            answer++;
        }
        sum -= arr[left++];
    } else {
        sum += arr[right++];
    }
}

console.log(answer)