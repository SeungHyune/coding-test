function solution(numbers) {
  let answer = 0;
  let n = numbers.length;
  let ch = Array.from({ length: n }, () => 0);
  let arr = [];
  function dfs(L, s) {
    if (L === n) {
      if (s > 1) arr.push(Number(s));
    } else {
      for (let i = 0; i < n; i++) {
        if (ch[i] === 0) {
          ch[i] = 1;
          dfs(L + 1, s + numbers[i]);
          dfs(L + 1, s);
          ch[i] = 0;
        }
      }
    }
  }
  dfs(0, "");
  let set = [...new Set(arr)];
  for (const a of set) {
    let flag = 1;
    for (let i = 2; i <= Math.sqrt(a); i++) {
      if (a % i === 0) {
        flag = 0;
        break;
      }
    }
    if (flag) answer++;
  }
  return answer;
}
