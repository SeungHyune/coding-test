let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const t = +input.shift();

let results = [];

function getSearch(n) {
  let left = 0;
  let right = n;
  let result = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let sum = (mid * (mid + 1)) / 2;

    if (sum <= n) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

for (let i = 0; i < t; i++) {
  let n = +input[i];
  results.push(getSearch(n));
}
console.log(results.join("\n"));
