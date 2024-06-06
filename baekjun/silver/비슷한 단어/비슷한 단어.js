const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const str = input[1];
const strArr = input.slice(2);

function solution(str, strArr) {
  let answer = 0;

  let map = new Map();
  for (const char of str) {
    map.set(char, map.get(char) ? map.get(char) + 1 : 1);
  }

  strArr.forEach((str) => {
    let map2 = new Map(map);
    let gap = 0;
    // 찾으려는 단어보다 비교하려는 단어가 긴 경우 글자수 찾기
    for (const char of str) {
      if (map2.has(char)) {
        map2.set(char, map2.get(char) - 1);
        if (map2.get(char) === 0) map2.delete(char);
      } else {
        gap += 1;
      }
    }

    let gap2 = 0;
    // 찾으려는 단어가 긴 경우 남은 글자수 찾기
    for (const [, value] of map2) {
      gap2 += value;
    }

    gap = Math.max(gap, gap2);
    if (gap < 2) answer++;
  });

  console.log(answer);
  return answer;
}

solution(str, strArr);
