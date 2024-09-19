const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));
arr.pop();

const graph = Array.from({ length: N }, () => []);

for (const [x, y] of arr) {
  graph[x - 1].push(y - 1);
  graph[y - 1].push(x - 1);
}

const member = new Map();
let resultScore = Infinity;

for (let i = 0; i < N; i++) {
  const checker = Array.from({ length: N }, () => 0);

  // 자기 자신
  checker[i] = 1;

  for (let j = 0; j < graph[i].length; j++) {
    const next = graph[i][j];

    if (checker[next] > 1 || checker[next] === 0) {
      checker[next] = 1;

      const queue = [[next, 1]];

      while (queue.length > 0) {
        const [current, step] = queue.shift();

        for (let k = 0; k < graph[current].length; k++) {
          const next = graph[current][k];

          if (checker[next] > step + 1 || checker[next] === 0) {
            checker[next] = step + 1;
            queue.push([next, step + 1]);
          }
        }
      }
    }
  }

  const score = Math.max(...checker);
  const memberArr = member.get(score) || [];
  memberArr.push(i + 1);
  member.set(score, memberArr);
  resultScore = Math.min(resultScore, score);
}

console.log(resultScore, member.get(resultScore).length);
console.log(member.get(resultScore).join(" "));
