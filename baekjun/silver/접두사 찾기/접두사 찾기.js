const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1);

const map = new Map();

// N개의 문자열의 접두사를 map 객체에 저장
for (let i = 0; i < N; i++) {
  const string = arr[i];

  let prefix = "";

  for (const str of string) {
    prefix += str;

    map.set(prefix, true);
  }
}

let answer = 0;

for (let i = N; i < M + N; i++) {
  if (map.has(arr[i])) {
    answer++;
  }
}

console.log(answer);
