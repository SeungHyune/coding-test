function solution(n, a, b) {
  let answer = 1;
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  while (Math.pow(2, answer) < n) {
    if (min % 2 === 1 && min + 1 === max) {
      return answer;
    }
    min = Math.ceil(min / 2);
    max = Math.ceil(max / 2);
    answer++;
  }
  return answer;
}
