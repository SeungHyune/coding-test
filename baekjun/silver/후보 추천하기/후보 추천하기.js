const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [M], [...arr]] = input.map((a) => a.split(" ").map(Number));

const map = new Map();

for (const condidate of arr) {
  // 후보자가 등록된 경우
  if (map.has(condidate)) {
    map.set(condidate, map.get(condidate) + 1);

    continue;
  }

  // 후보자가 처음 등록되는 경우
  if (map.size < N) {
    map.set(condidate, 1);

    continue;
  }

  const mapArr = [...map].sort((a, b) => a[1] - b[1]);
  const deleteCondidate = mapArr.shift()[0];

  map.delete(deleteCondidate);

  map.set(condidate, 1);
}

const mapArr = [...map].map((number) => number[0]).sort((a, b) => a - b);
console.log(mapArr.join(" "));
