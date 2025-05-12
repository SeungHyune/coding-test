const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1);
const powers = input.slice(N + 1).map(Number);

const answer = [];

for (let i = 0; i < M; i++) {
  const currentScore = powers[i];

  let [start, end] = [0, N - 1];
  let target = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const [power, score] = arr[mid].split(" ");

    if (currentScore <= Number(score)) {
      target = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  const [power] = arr[target].split(" ");
  answer.push(power);
}

console.log(answer.join("\n"));
