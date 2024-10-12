function solution(n) {
  let dy = Array.from({ length: n + 1 }, () => 0);
  dy[1] = 1;
  dy[2] = 2;
  for (let i = 3; i <= n; i++) {
    dy[i] = (dy[i - 2] % 1000000007) + (dy[i - 1] % 1000000007);
  }
  return dy[n] % 1000000007;
}
