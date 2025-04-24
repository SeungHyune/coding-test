const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 0)
);

for (let i = 0; i < N; i++) {
  const queue = [i];

  while (queue.length > 0) {
    const current = queue.shift();

    for (let k = 0; k < arr[current].length; k++) {
      const bool = arr[current][k];

      if (bool === 0) continue;
      if (visited[i][k] === 1) continue;

      visited[i][k] = 1;
      queue.push(k);
    }
  }
}

const answer = visited.map((a) => a.join(" ")).join("\n");
console.log(answer);
