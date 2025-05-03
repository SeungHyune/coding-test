const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [[T], ...arr] = input.map((a) => a.split(" ").map(Number));

while (T--) {
  const N = arr.shift();
  const nArr = arr.shift();

  const m = arr.shift();
  const mArr = arr.shift();

  nArr.sort((a, b) => a - b);

  let result = [];

  for (const num of mArr) {
    let [left, right] = [0, N - 1];

    let flag = false;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nArr[mid] === num) {
        flag = true;
        result.push(1);
        break;
      } else if (nArr[mid] > num) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    if (flag === false) {
      result.push(0);
    }
  }

  console.log(result.join("\n"));
}
