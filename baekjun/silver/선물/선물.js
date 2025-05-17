const input = require("fs")
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const [N, L, W, H] = input;

function check(a) {
  if (Math.floor(L / a) * Math.floor(W / a) * Math.floor(H / a) >= N)
    return true;
  return false;
}

function binarySearch() {
  let ret = 0;

  let left = 0;
  let right = Math.max(L, Math.max(W, H));
  for (let i = 0; i < 57; i++) {
    let mid = (left + right) / 2;
    if (check(mid)) {
      left = mid;
      ret = mid;
    } else {
      right = mid;
    }
  }
  return ret.toFixed(9);
}
function main() {
  let answer = binarySearch();
  return console.log(answer);
}
main();
