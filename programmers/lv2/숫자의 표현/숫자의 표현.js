function solution(n) {
  let answer = 1; // n의 자기 자신 값
  for (let i = 1; i < n / 2; i++) {
    let sum = n;
    let j = i;
    while (sum > 0) {
      sum -= j;
      j++;
      if (sum === 0) {
        answer++;
        break;
      }
    }
  }
  return answer;
}
