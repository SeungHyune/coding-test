function solution(msg) {
  let answer = [];
  let arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  for (let i = 0; i < msg.length; i++) {
    let str = msg[i];
    let idx = arr.indexOf(str);
    let prevI = arr.indexOf(str);
    let j = i;
    while (idx > -1) {
      j++;
      str += msg[j];
      idx = arr.indexOf(str);
      if (idx > -1) prevI = idx;
    }

    arr.push(str);
    answer.push(prevI + 1);
    i = j - 1;
  }
  return answer;
}
