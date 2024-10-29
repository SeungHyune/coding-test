const fs = require("fs");
const [F, S, G, U, D] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")[0]
  .split(" ")
  .map(Number);

const ch = Array.from({ length: F + U + 1 }, () => Infinity);
ch[S] = 0;

const queue = [S];

while (queue.length > 0) {
  const next = queue.shift();

  for (const n of [next - D, next + U]) {
    if (n <= 0 || F < n) continue;

    if (ch[n] === Infinity) {
      ch[n] = ch[next] + 1;
      queue.push(n);
    }

    if (G === n) {
      break;
    }
  }
}

if (ch[G] === Infinity) {
  console.log("use the stairs");
} else {
  console.log(ch[G]);
}
