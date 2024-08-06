const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();

let result = 0;
let current = input.shift();

let max = Math.max(...input);

if (max === Infinity) {
  console.log(result);
  return;
}

while (current <= max) {
  const index = input.indexOf(max);

  input[index] -= 1;
  result++;
  current++;

  max = Math.max(...input);
}

console.log(result);
