const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const [A, B] = input[2].split(" ").map(Number);

const visited = Array.from({ length: N }, () => false);
visited[A - 1] = true;

const queue = [[A - 1, 1]];

while (queue.length > 0) {
  const [currentIndex, jumpCount] = queue.shift();
  const jumpNumber = arr[currentIndex];

  let front = currentIndex + jumpNumber;
  while (front < N) {
    if (front === B - 1) {
      console.log(jumpCount);
      return;
    }

    if (!visited[front]) {
      queue.push([front, jumpCount + 1]);
      visited[front] = true;
    }

    front += jumpNumber;
  }

  let back = currentIndex - jumpNumber;
  while (back >= 0) {
    if (back === B - 1) {
      console.log(jumpCount);
      return;
    }

    if (!visited[back]) {
      queue.push([back, jumpCount + 1]);
    }

    back -= jumpNumber;
  }
}

console.log(-1);
