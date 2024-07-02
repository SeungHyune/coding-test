// 그룹 단어란 하나의 알파벳은 연속해서 나올 수 있지만, 한 번 나온 이후 등장하는 경우 그룹 단어가 아니다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());

function main() {
  let result = 0;

  for (const str of input) {
    // str 단어에서 등장한 알파벳을 저장하는 map 메서드
    // 한 번 등장한 이후 또 등장하는 경우는 그룹 단어가 아니다.
    const map = new Map();

    let flag = true;

    for (let i = 0; i < str.length; i++) {
      const s = str[i];

      // 2번째 알파벳부터 순회하며 이전 알파벳과 현재 알파벳이 같다면 continue 한다.
      if (i > 0 && s === str[i - 1]) {
        continue;
      }

      // 만약 이미 map에 저장된 알파벳이라면 그룹 단어가 아니기 때문에
      // 즉시 반복을 종료한다.
      if (map.has(s)) {
        flag = false;
        break;
      } else {
        // 처음 등장한 알파벳인 경우 중복 알파벳을 찾기 위해 map 메서드에 저장한다.
        map.set(s, true);
      }
    }

    // 그룹 단어인 경우 개수를 누적한다.
    if (flag) {
      result++;
    }
  }

  return result;
}

console.log(main());
