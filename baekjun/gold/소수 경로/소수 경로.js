const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [[N], ...arr] = input.map((a) => a.split(" "));

while (N--) {
  const [start, end] = arr.shift();

  const visited = new Set();
  visited.add(start);

  const queue = [[start, 0]];

  let flag = false;

  while (queue.length > 0) {
    const [currentPrime, count] = queue.shift();

    if (currentPrime === end) {
      console.log(count);
      flag = true;
      break;
    }

    for (let i = 0; i <= 3; i++) {
      for (let k = 0; k <= 9; k++) {
        // 첫 번째 자릿수가 0인 경우
        if (i === 0 && k === 0) continue;

        const prime = currentPrime.split("");
        prime.splice(i, 1, k);
        const newPrime = prime.join("");

        const isPrime = isPrimeCheck(newPrime);

        if (!isPrime) continue; // 소수가 아닌 경우 체크
        if (visited.has(newPrime)) continue; // 이미 방문한 소수 체크

        visited.add(newPrime);
        queue.push([newPrime, count + 1]);
      }
    }
  }

  if (flag === false) {
    console.log("Impossible");
  }
}

function isPrimeCheck(newPrime) {
  const prime = Number(newPrime);

  if (prime === 2) {
    return true;
  }

  for (let i = 2; i <= Math.floor(Math.sqrt(prime)); i++) {
    if (prime % i === 0) {
      // 한 번이라도 나누어 졌으니 소수가 아니므로 return false
      return false;
    }
  }
  // 나눠진 수가 없다면 해당 수는 소수이므로 return true
  return true;
}
