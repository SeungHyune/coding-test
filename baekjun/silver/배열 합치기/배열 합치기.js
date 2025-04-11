const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], ...arr] = input.map((a) => a.split(" ").map(Number));
const newArr = [...arr[0], ...arr[1]].sort((a, b) => a - b);

console.log(newArr.join(" "));
