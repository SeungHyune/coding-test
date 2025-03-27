const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const K = Number(input[2]);

// 최대로 만들 수 있는 정수 길이만큼 1로 미리 초기화 (1은 무조건 존재)
const ch = Array.from({ length: K * arr.at(-1) + 1 }, (_, idx) => idx);

for (let i = 1; i < N; i++) {
  const num = arr[i];

  ch[num] = 1;

  const queue = [num];

  while (queue.length > 0) {
    const current = queue.shift();

    // 현재 정숫값과 정수 배열의 정수 값을 더한 값을 구해
    // 정수 개수를 비교하여 최솟값으로 갱신해준다.
    for (const a of arr) {
      const currentCount = ch[current];
      const next = current + a;
      const nextCount = ch[next];

      if (currentCount + 1 <= K && currentCount + 1 < nextCount) {
        ch[next] = currentCount + 1;
        queue.push(next);
      }
    }
  }
}

for (let i = 1; i < ch.length; i++) {
  if (ch[i] > K) {
    if (i % 2 === 0) {
      // 홀수 승리
      console.log(`holsoon win at ${i}`);
    } else {
      // 짝수 승리
      console.log(`jjaksoon win at ${i}`);
    }
    return;
  }
}
