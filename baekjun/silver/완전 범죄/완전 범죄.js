const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, S, D, F, B, K] = input[0].split(" ").map(Number);
const arr = K > 0 ? input[1].split(" ").map(Number) : [];

const visited = Array.from({ length: N + 1 }, () => false);

for (const a of arr) {
  visited[a] = true;
}

const queue = [[S, 0]];

visited[S] = true;

while (queue.length > 0) {
  const [current, count] = queue.shift();

  if (current === D) {
    console.log(count);
    return;
  }

  for (const next of [current + F, current - B]) {
    if (next < 0 || next > N) continue; // 마포구 범위를 벗어난 경우
    if (visited[next]) continue; // 이미 방문한 마포구 혹은 경찰서인 경우

    visited[next] = true;
    queue.push([next, count + 1]);
  }
}

console.log("BUG FOUND");
