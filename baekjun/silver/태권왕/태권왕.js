const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

while (N--) {
  const [S, T] = arr.shift();

  const queue = [[S, T, 0]];

  while (queue.length > 0) {
    const [S, T, count] = queue.shift();

    if (S === T) {
      console.log(count);
      break;
    }

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        // A의 현재 점수 만큼 점수를 얻는 발차기, 상대도 3점 득점
        if (S * 2 > T + 3) continue;
        queue.push([S + S, T + 3, count + 1]);
      } else if (i === 1) {
        // A만 1점 얻는 발차기
        if (visited[S + 1]) continue;
        queue.push([S + 1, T, count + 1]);
      }
    }
  }
}
