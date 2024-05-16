const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));

const [[N, M], ...arr] = input;

const friends = Array.from({ length: N + 1 }, () => []);

for (const [x, y] of arr) {
  friends[x].push(y);
  friends[y].push(x);
}

function solution() {
  let [answer, index] = [Number.MAX_SAFE_INTEGER, 0];

  for (let i = 1; i <= N; i++) {
    const visited = Array.from({ length: N + 1 }, () => 0);
    visited[i] = -1;

    for (let j = 0; j < friends[i].length; j++) {
      const nextFriend = friends[i][j];

      visited[nextFriend] = 1;

      const queue = [[nextFriend, 1]];

      while (queue.length > 0) {
        const [nextFriend, step] = queue.shift();

        for (let k = 0; k < friends[nextFriend].length; k++) {
          const nextNextFriend = friends[nextFriend][k];

          if (visited[nextNextFriend] === 0) {
            visited[nextNextFriend] = step + 1;

            queue.push([nextNextFriend, step + 1]);
          } else {
            if (visited[nextNextFriend] > step + 1) {
              visited[nextNextFriend] = step + 1;

              queue.push([nextNextFriend, step + 1]);
            }
          }
        }
      }
    }

    const sum = visited.reduce((prev, cur) => prev + cur, 0) + 1;

    if (answer > sum) {
      answer = sum;
      index = i;
    }
  }

  return index;
}

console.log(solution());
