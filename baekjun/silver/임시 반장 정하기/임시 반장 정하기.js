const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);

for (let i = 0; i < 5; i++) {
  const same = new Map();

  for (let j = 0; j < N; j++) {
    const sameArr = same.get(arr[j][i]) || [];
    sameArr.push(j);

    same.set(arr[j][i], sameArr);
  }

  for (const [num, numArr] of same) {
    if (numArr.length > 1) {
      for (const index of numArr) {
        for (const index2 of numArr) {
          visited[index][index2] = true;
        }
      }
    }
  }
}

let result = 1;
let max = 0;

for (let i = 0; i < N; i++) {
  const count = visited[i].filter((v) => v).length;

  if (max < count) {
    result = i + 1;
    max = count;
  }
}

console.log(result);
