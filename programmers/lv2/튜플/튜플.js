function solution(s) {
  let answer = [];
  let map = new Map();
  let num = "";
  for (let a of s) {
    if (!isNaN(a)) num += a;
    else if (num !== "") {
      if (map.has(num)) map.set(num, map.get(num) + 1);
      else map.set(num, 1);
      num = "";
    }
  }

  let arr = Array.from(map);
  arr.sort((a, b) => b[1] - a[1]);
  for (let [key, val] of arr) {
    answer.push(Number(key));
  }

  return answer;
}
