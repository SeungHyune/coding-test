const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const omok = Array.from({ length: 19 }, () =>
  Array.from({ length: 19 }, () => 0)
);

let turn = 0;

while (arr.length > 0) {
  const [x, y] = arr.shift();
  // 흑 - 1 / 백 - 2
  const color = (turn + 1) % 2 === 1 ? 1 : 2;

  omok[x - 1][y - 1] = color;

  turn++;

  // 한 사람이 5번 미만 놓은 경우 continue
  if (turn < 9) continue;

  // 좌 + 우
  if (left(x - 1, y - 1, color) + right(x - 1, y - 1, color) === 4) {
    return console.log(turn);
  }

  // 상 + 하
  if (top(x - 1, y - 1, color) + bottom(x - 1, y - 1, color) === 4) {
    return console.log(turn);
  }

  // 상우 + 하좌
  if (topRight(x - 1, y - 1, color) + bottomLeft(x - 1, y - 1, color) === 4) {
    return console.log(turn);
  }

  // 상좌 + 하우
  if (topLeft(x - 1, y - 1, color) + bottomRight(x - 1, y - 1, color) === 4) {
    return console.log(turn);
  }
}

function left(x, y, color) {
  let count = 0;
  y--;

  while (true) {
    if (y < 0 || omok[x][y] !== color) return count;

    count++;
    y--;
  }
}

function right(x, y, color) {
  let count = 0;
  y++;

  while (true) {
    if (y >= 19 || omok[x][y] !== color) return count;

    count++;
    y++;
  }
}

function bottom(x, y, color) {
  let count = 0;
  x++;

  while (true) {
    if (x >= 19 || omok[x][y] !== color) return count;

    count++;
    x++;
  }
}

function top(x, y, color) {
  let count = 0;
  x--;

  while (true) {
    if (x < 0 || omok[x][y] !== color) return count;

    count++;
    x--;
  }
}

function topRight(x, y, color) {
  let count = 0;
  x--;
  y++;

  while (true) {
    if (x < 0 || y >= 19 || omok[x][y] !== color) return count;

    count++;
    x--;
    y++;
  }
}

function topLeft(x, y, color) {
  let count = 0;
  x--;
  y--;

  while (true) {
    if (x < 0 || y < 0 || omok[x][y] !== color) return count;

    count++;
    x--;
    y--;
  }
}

function bottomRight(x, y, color) {
  let count = 0;
  x++;
  y++;

  while (true) {
    if (x >= 19 || y >= 19 || omok[x][y] !== color) return count;

    count++;
    x++;
    y++;
  }
}

function bottomLeft(x, y, color) {
  let count = 0;
  x++;
  y--;

  while (true) {
    if (x >= 19 || y < 0 || omok[x][y] !== color) return count;

    count++;
    x++;
    y--;
  }
}

console.log(-1);
