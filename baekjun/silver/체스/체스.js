// n * m 크기의 체스판과 상대팀의 Queen, Knight, Pawn 위치가 주어졌을 때 안전한 칸이 몇 칸인지 세는 프로그램을 작성하시오.

// Queen은 가로, 세로, 대각선으로 갈 수 있는 만큼 최대한 많이 이동 할 수 있다. 만약 중간에 장애물이 있다면 이동을 할 수 없다.
// Knight는 2x3 직사각형을 그렸을 때, 반대쪽 꼭짓점으로 이동할 수 있다. 중간에 장애물이 있더라도 이동할 수 있다.
// Pwan은 상대팀의 말을 잡을 수 없다.(장애물 역할만 한다.)

// n,m
// Queen의 개수와 위치
// Knight의 개수와 위치
// Pawn의 개수와 위치

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const queen = input.shift().split(" ").map(Number);
const queenLength = queen.shift();
const queenArr = [];

const knight = input.shift().split(" ").map(Number);
const knightLength = knight.shift();
const knightArr = [];

const pawn = input.shift().split(" ").map(Number);
const pawnLength = pawn.shift();

const chess = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
);

while (queen.length > 0) {
  const x = queen.shift();
  const y = queen.shift();

  queenArr.push([x - 1, y - 1]);
  chess[x - 1][y - 1] = "Q";
}

while (knight.length > 0) {
  const x = knight.shift();
  const y = knight.shift();

  knightArr.push([x - 1, y - 1]);
  chess[x - 1][y - 1] = "K";
}

while (pawn.length > 0) {
  const x = pawn.shift();
  const y = pawn.shift();

  chess[x - 1][y - 1] = "P";
}

while (queenArr.length > 0) {
  const [x, y] = queenArr.shift();

  top(x, y);
  bottom(x, y);

  left(x, y);
  right(x, y);

  topRight(x, y);
  bottomLeft(x, y);

  topLeft(x, y);
  bottomRight(x, y);
}

while (knightArr.length > 0) {
  const [x, y] = knightArr.shift();

  knightMove(x, y);
}

function top(x, y) {
  x--;

  while (true) {
    if (
      x < 0 ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    x--;
  }
}

function bottom(x, y) {
  x++;

  while (true) {
    if (
      x >= N ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    x++;
  }
}

function right(x, y) {
  y++;

  while (true) {
    if (
      y >= M ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    y++;
  }
}

function left(x, y) {
  y--;

  while (true) {
    if (
      y < 0 ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    y--;
  }
}

function topRight(x, y) {
  x--;
  y++;

  while (true) {
    if (
      x < 0 ||
      y >= M ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    x--;
    y++;
  }
}

function topLeft(x, y) {
  x--;
  y--;

  while (true) {
    if (
      x < 0 ||
      y < 0 ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    x--;
    y--;
  }
}

function bottomRight(x, y) {
  x++;
  y++;

  while (true) {
    if (
      x >= N ||
      y >= M ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    x++;
    y++;
  }
}

function bottomLeft(x, y) {
  x++;
  y--;

  while (true) {
    if (
      x >= N ||
      y < 0 ||
      chess[x][y] === "P" ||
      chess[x][y] === "Q" ||
      chess[x][y] === "K"
    )
      break;

    chess[x][y] = 1;
    x++;
    y--;
  }
}

function knightMove(x, y) {
  if (x - 2 >= 0 && y - 1 >= 0 && chess[x - 2][y - 1] === 0)
    chess[x - 2][y - 1] = 1;

  if (x - 1 >= 0 && y - 2 >= 0 && chess[x - 1][y - 2] === 0)
    chess[x - 1][y - 2] = 1;

  if (x - 2 >= 0 && y + 1 < M && chess[x - 2][y + 1] === 0)
    chess[x - 2][y + 1] = 1;

  if (x - 1 >= 0 && y + 2 < M && chess[x - 1][y + 2] === 0)
    chess[x - 1][y + 2] = 1;

  if (x + 1 < N && y - 2 >= 0 && chess[x + 1][y - 2] === 0)
    chess[x + 1][y - 2] = 1;

  if (x + 2 < N && y - 1 >= 0 && chess[x + 2][y - 1] === 0)
    chess[x + 2][y - 1] = 1;

  if (x + 1 < N && y + 2 < M && chess[x + 1][y + 2] === 0)
    chess[x + 1][y + 2] = 1;

  if (x + 2 < N && y + 1 < M && chess[x + 2][y + 1] === 0)
    chess[x + 2][y + 1] = 1;
}

console.log(chess.flatMap((a) => a).filter((a) => a === 0).length);
