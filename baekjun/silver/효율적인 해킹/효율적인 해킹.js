const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N }, () => []);

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(" ");
  graph[B - 1].push(A - 1);
}

let hacking = 0;
let hackingArr = [];

for (let i = 0; i < N; i++) {
  const visited = Array.from({ length: N }, () => false);
  visited[i] = true;

  const queue = [i];
  let hackingCount = 1;

  while (queue.length > 0) {
    const current = queue.pop();

    for (let k = 0; k < graph[current].length; k++) {
      const next = graph[current][k];

      if (visited[next]) continue;

      visited[next] = true;
      queue.push(next);
      hackingCount++;
    }
  }

  if (hacking === hackingCount) {
    hackingArr.push(i + 1);
  } else if (hacking < hackingCount) {
    hacking = hackingCount;
    hackingArr = [i + 1];
  }
}

console.log(hackingArr.join(" "));
