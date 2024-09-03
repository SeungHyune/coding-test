function solution(k, dungeons) {
  let answer = Number.MIN_SAFE_INTEGER;
  let n = dungeons.length;
  let ch = Array.from({ length: n + 1 }, () => 0);
  function dfs(L, s, c) {
    if (L === n) {
      answer = Math.max(answer, c);
    } else {
      for (let i = 0; i < n; i++) {
        if (ch[i] === 0) {
          ch[i] = 1;
          if (s >= dungeons[i][0]) {
            dfs(L + 1, s - dungeons[i][1], c + 1);
          } else dfs(L + 1, s, c);
          ch[i] = 0;
        }
      }
    }
  }
  dfs(0, k, 0);
  return answer;
}
