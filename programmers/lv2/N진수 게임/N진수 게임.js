function solution(n, t, m, p) {
  let answer = "";
  let str = "";
  let j = 0;
  while (str.length < t * m) {
    str += j.toString(n);
    j++;
  }

  for (let i = 0; i < str.length; i++) {
    if (i % m === p - 1) answer += str[i].toUpperCase();
  }
  return answer.slice(0, t);
}
