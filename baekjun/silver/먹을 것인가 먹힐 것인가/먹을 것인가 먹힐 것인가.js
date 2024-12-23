const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [T, ...arr] = input.map((a) => a.split(" ").map(Number));

while (T--) {
  const [N, M] = arr.shift();
  const aArr = arr.shift().sort((a, b) => a - b);
  const bArr = arr.shift().sort((a, b) => a - b);

  let result = 0;

  for (let i = 0; i < N; i++) {
    const A = aArr[i];

    let [start, end] = [0, M - 1];

    let index = -1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const B = bArr[mid];
      if (A <= B) {
        end = mid - 1;
      } else {
        start = mid + 1;

        if (index < mid) {
          index = mid;
        }
      }
    }

    if (index > -1) {
      result += index + 1;
    }
  }

  console.log(result);
}
