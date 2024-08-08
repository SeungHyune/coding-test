const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const rod = [64];
let sum = 64;

while (sum > input) {
  const min = rod.pop() / 2;
  rod.push(min);
  sum -= min;

  if (sum < input) {
    sum += min;
    rod.push(min);
  }

  rod.sort((a, b) => b - a);
}

console.log(rod.length);
