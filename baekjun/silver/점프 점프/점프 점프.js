const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], [...arr]] = input.map((a) => a.split(" ").map(Number));

const visited = Array.from({ length: N }, () => false);
visited[0] = true;

const queue = [[0, 0]];

while (queue.length > 0) {
  const [current, jump] = queue.shift();

  if (current === N - 1) {
    console.log(jump);
    return;
  }

  const move = arr[current];

  for (let k = current + 1; k <= current + move; k++) {
    if (current >= N) continue;
    if (visited[k]) continue;

    visited[k] = true;
    queue.push([k, jump + 1]);
  }
}

console.log(-1);
