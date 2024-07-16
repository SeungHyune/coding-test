function solution(citations) {
  let answer = 0;
  for (let i = 1; i <= citations.length; i++) {
    let cnt = 0;
    for (const article of citations) {
      if (i <= article) cnt++;
      if (cnt >= i) {
        answer = i;
        break;
      }
    }
  }
  return answer;
}
