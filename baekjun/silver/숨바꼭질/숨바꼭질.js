const fs = require("fs");

const [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const visited = Array.from({ length: 100001 }, () => 0);

const queue = [N];

if (N === K) {
  return console.log(0);
}

while (true) {
  const cur = queue.shift();

  let chk = false;

  for (const next of [cur - 1, cur + 1, 2 * cur]) {
    if (visited[next] === 0) {
      visited[next] = visited[cur] + 1;
      queue.push(next);
    }

    if (next === K) {
      chk = true;
    }
  }

  if (chk) {
    return console.log(visited[K]);
  }
}
