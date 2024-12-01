const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, C], [...arr]] = input.map((a) => a.split(" ").map(Number));

arr.sort((a, b) => a - b);

let [left, right] = [0, N - 1];

while (left < right) {
  const sum = arr[left] + arr[right];

  if (arr[left] === C || arr[right] === C) {
    return console.log(1);
  }

  if (sum > C) {
    right--;
  } else {
    if (sum === C) {
      return console.log(1);
    }

    let i = left;
    let checkSum = sum;

    while (i + 1 < right && checkSum < C) {
      i++;
      checkSum = sum + arr[i];
    }

    if (checkSum === C) {
      return console.log(1);
    } else {
      left++;
    }
  }
}

console.log(0);
