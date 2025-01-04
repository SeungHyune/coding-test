// 가장 긴 감소하는 부분 수열
var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let arrs = [];

function testF(N, rest) {
  for (let i = 0; i < N; i++) {
    if (i === 0) {
      arrs[i] = 1;
    } else {
      arrs[i] = 1;
      let sliced = rest.slice(0, i);
      let filtered = [];
      for (let j = 0; j < sliced.length; j++) {
        let r = sliced[j];
        if (rest[i] < r) {
          filtered.push(arrs[j]);
        }
      }
      if (filtered.length > 0) {
        arrs[i] = Math.max(...filtered) + 1;
      }
    }
  }
}

function solution(input) {
  let [T, sec] = input;

  let rest = sec.split(" ").map(Number);
  testF(Number(T), rest);

  console.log(Math.max(...arrs));
}
solution(input);
