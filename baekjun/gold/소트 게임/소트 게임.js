const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, K], [...arr]] = input.map((a) => a.split(" ").map(Number));
const arrayString = arr.join("");

const queue = [[arrayString, 0]];

const target = arr.sort((a, b) => a - b).join("");

const visited = new Set();
visited.add(arrayString);

while (queue.length > 0) {
  const [currentArray, count] = queue.shift();

  if (currentArray === target) {
    console.log(count);
    return;
  }

  for (let index = 0; index < N; index++) {
    // index에서 K 만큼 뒤집을 수 없는 경우
    if (index + K - 1 >= N) {
      continue;
    }

    for (let i = index; i < index + K; i++) {
      // 현재 수열과 만들려는 수열의 자릿수 비교
      // 자릿수가 같은 경우 다음 index 찾기
      if (currentArray[i] === target[i]) {
        continue;
      }

      // 뒤집기 로직 실행
      const reverseArray = reverse(currentArray, index, K);

      if (visited.has(reverseArray)) continue;

      visited.add(reverseArray);
      queue.push([reverseArray, count + 1]);
    }
  }
}

function reverse(currentArray, index, K) {
  const array = currentArray.split("");
  const reverseK = array.splice(index, K).reverse();
  array.splice(index, 0, ...reverseK);

  return array.join("");
}

console.log(-1);
