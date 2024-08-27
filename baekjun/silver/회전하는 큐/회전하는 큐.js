const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], [...arr]] = input.map((a) => a.split(" ").map(Number));

let answer = 0;
const numArr = Array.from({ length: N }, (_, index) => index + 1);

function solution() {
  for (const num of arr) {
    const front = numArr.indexOf(num);
    const back = numArr.length - numArr.indexOf(num);

    if (num === numArr[0]) {
      numArr.shift();
      continue;
    }

    if (front < back) {
      // front 방향으로 움직여야함
      move("front", front);
      answer += front;
    } else {
      // back 방향으로 움직여야함
      move("back", back);
      answer += back;
    }

    numArr.shift();
  }

  console.log(answer);
}

solution();

function move(type, count) {
  while (count--) {
    if (type === "back") {
      numArr.unshift(numArr.pop());
    } else if (type === "front") {
      numArr.push(numArr.shift());
    }
  }
}
