const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [[N, start], ...arr] = input.map((a) => a.split(" ").map(Number));

let answer = Infinity;

while (N--) {
  const [s, p, length] = arr.shift();

  for (let i = 0; i < length; i++) {
    const m = s + p * i;

    if (start <= m) {
      answer = Math.min(answer, m - start);
    }
  }
}

if (answer === Infinity) {
  console.log(-1);
} else {
  console.log(answer);
}
