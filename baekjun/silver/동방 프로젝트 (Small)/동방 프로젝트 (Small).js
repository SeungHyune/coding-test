const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());
const M = Number(input.shift());
const arr = input.map((a) => a.split(" ").map(Number));

function solution() {
  const visited = Array.from({ length: N + 1 }, () => false);

  for (const [x, y] of arr) {
    for (let i = x; i < y; i++) {
      visited[i] = true;
    }
  }

  const wall = visited.filter((visit) => visit === false).length;

  return wall - 1;
}

console.log(solution());
