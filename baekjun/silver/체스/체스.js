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
const qLength = queen.shift();

const knight = input.shift().split(" ").map(Number);
const kLength = knight.shift();

const pwan = input.shift().split(" ").map(Number);
const pLength = pwan.shift();

const chess = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
);

while (queen.length > 0) {
  const x = queen.shift();
  const y = queen.shift();

  chess[x - 1][y - 1] = "Q";
}

while (knight.length > 0) {
  const x = knight.shift();
  const y = knight.shift();

  chess[x - 1][y - 1] = "K";
}

while (pwan.length > 0) {
  const x = pwan.shift();
  const y = pwan.shift();

  chess[x - 1][y - 1] = "P";
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (typeof chess[i][j] === "number" || chess[i][j] === "P") continue;

    if (chess[i][j] === "Q") {
      queenTopMove(i, j);
      queenBottomMove(i, j);
      queenRightMove(i, j);
      queenLeftMove(i, j);
      queenTopRightMove(i, j);
      queenTopLeftMove(i, j);
      queenBottomRightMove(i, j);
      queenBottomLeftMove(i, j);
    }

    if (chess[i][j] === "K") {
      knightMove(i, j);
    }
  }
}

function queenTopMove(x, y) {
  // top
  while (true) {
    x--;
    if (x < 0 || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function queenBottomMove(x, y) {
  // bottom
  while (true) {
    x++;
    if (x >= N || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function queenRightMove(x, y) {
  // right
  while (true) {
    y++;
    if (y >= M || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function queenLeftMove(x, y) {
  // left
  while (true) {
    y--;
    if (y < 0 || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function queenTopRightMove(x, y) {
  // topRight
  while (true) {
    x--;
    y++;
    if (x < 0 || y >= M || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function queenTopLeftMove(x, y) {
  // topLeft
  while (true) {
    x--;
    y--;
    if (x < 0 || y < 0 || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function queenBottomRightMove(x, y) {
  // bottomRight
  while (true) {
    x++;
    y++;
    if (x >= N || y >= N || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function queenBottomLeftMove(x, y) {
  // bottomLeft
  while (true) {
    x++;
    y--;
    if (x >= N || y < 0 || chess[x][y] === "P") break;

    chess[x][y] = 1;
  }
}

function knightMove(x, y) {
  if (x - 2 >= 0 && y - 1 >= 0 && chess[x - 2][y - 1] === 0) {
    chess[x - 2][y - 1] = 1;
  }

  if (x - 1 >= 0 && y - 2 >= 0 && chess[x - 1][y - 2] === 0) {
    chess[x - 2][y - 1] = 1;
  }

  if (x - 2 >= 0 && y + 1 < M && chess[x - 2][y + 1] === 0) {
    chess[x - 2][y + 1] = 1;
  }

  if (x - 1 >= 0 && y + 2 < M && chess[x - 1][y + 2] === 0) {
    chess[x - 1][y + 2] = 1;
  }

  if (x + 1 < N && y - 2 >= 0 && chess[x + 1][y - 2] === 0) {
    chess[x + 1][y - 2] = 1;
  }

  if (x + 2 < N && y - 1 >= 0 && chess[x + 2][y - 1] === 0) {
    chess[x + 2][y - 1] = 1;
  }

  if (x + 1 < N && y + 2 < M && chess[x + 1][y + 2] === 0) {
    chess[x + 1][y + 2] = 1;
  }

  if (x + 2 < N && y + 1 < M && chess[x + 2][y + 1] === 0) {
    chess[x + 2][y + 1] = 1;
  }
}

console.log(chess.flatMap((a) => a).filter((c) => c === 0).length);
