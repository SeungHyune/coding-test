const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, ...arr] = input;

function solution() {
  const map = new Map();

  for (let i = arr[0].length - 1; i >= 0; i--) {
    const checker = new Map();

    let flag = true;

    for (let j = 0; j < N; j++) {
      const mapGet = (map.get(j) || "") + arr[j][i];
      map.set(j, mapGet);

      if (checker.has(mapGet)) {
        flag = false;
      } else {
        checker.set(mapGet, 1);
      }
    }

    if (flag) {
      return arr[0].length - i;
    }
  }
}

console.log(solution());
