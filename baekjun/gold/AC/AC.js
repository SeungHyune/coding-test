const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [T, ...arr] = input;

let index = 0;

const answer = [];

while (T--) {
  const P = arr[index];
  const N = arr[index + 1];
  const testArr = JSON.parse(arr[index + 2]);

  let [left, right] = [0, N - 1];

  let direction = "left";
  let isError = false;

  for (const fn of P) {
    if (fn === "R") {
      direction = direction === "left" ? "right" : "left";

      continue;
    }

    if (left > right) {
      isError = true;
      break;
    }

    if (direction === "left") {
      left++;
    } else {
      right--;
    }
  }

  if (isError) {
    answer.push("error");
  } else {
    const sliceArr = testArr.slice(left, right + 1);

    if (direction === "right") {
      sliceArr.reverse();
    }

    answer.push(JSON.stringify(sliceArr));
  }

  index += 3;
}

console.log(answer.join("\n"));
