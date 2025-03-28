const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const start_square = "12345678";
const square_types = [
  [7, 6, 5, 4, 3, 2, 1, 0], // A 변환
  [3, 0, 1, 2, 5, 6, 7, 4], // B 변환
  [0, 2, 5, 3, 4, 6, 1, 7], // C 변환
  [4, 1, 2, 3, 0, 5, 6, 7], // D 변환
];

let target_square = "";

for (let i = 0; i < 8; i++) {
  target_square += input[i];
}

const queue = [[start_square, 0]];
const set = new Set();
set.add(start_square);

while (queue.length > 0) {
  const [square, convert] = queue.shift();

  if (target_square === square) {
    console.log(convert);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nextSquare = square_types[i].map((j) => square[j]).join("");

    if (set.has(nextSquare)) continue;

    set.add(nextSquare);
    queue.push([nextSquare, convert + 1]);
  }
}
