const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();

let result = [];
const arr = [" ", "+", "-"];

for (let i = 0; i < N; i++) {
  result = [];

  dfs(1, input[i], []);

  console.log(result.join("\n"));

  if (i !== N - 1) {
    console.log("");
  }
}

function dfs(L, N, temp) {
  if (L === N) {
    temp.push(L);

    const editTemp = [];

    let index = 0;
    while (temp.length > index) {
      const shift = temp[index++];

      if (shift === " ") {
        editTemp.push(Number(String(editTemp.pop()) + String(temp[index++])));
      } else {
        editTemp.push(shift);
      }
    }

    let calculate = 0;

    for (let i = 0; i < editTemp.length; i++) {
      if (i === 0) {
        calculate = editTemp[i];
      }

      if (editTemp[i] === "+") {
        calculate += editTemp[i + 1];
      } else if (editTemp[i] === "-") {
        calculate -= editTemp[i + 1];
      }
    }

    if (calculate === 0) {
      result.push(temp.join(""));
    }

    return;
  } else {
    for (let i = 0; i < 3; i++) {
      dfs(L + 1, N, [...temp, L, arr[i]]);
    }
  }
}
