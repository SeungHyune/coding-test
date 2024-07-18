function solution(progresses, speeds) {
  let answer = [];
  while (speeds.length) {
    let cnt = 0;
    // 날마다 작업 진도에 작업 속도를 더하여 주는 코드
    progresses = progresses.map((progress, i) => progress + speeds[i]);

    // 가장 우선 순위가 높은 작업이 100이상이라면 100미만이 나올때까지 반복
    while (progresses[0] >= 100) {
      cnt++;
      progresses.shift();
      speeds.shift();
    }
    if (cnt > 0) answer.push(cnt);
  }
  return answer;
}
