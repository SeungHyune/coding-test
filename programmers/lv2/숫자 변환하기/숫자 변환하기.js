function solution(x, y, n) {
  let answer = -1;
  if (x === y) return 0;
  let dy = Array.from({ length: y + 1 }, () => 1000000);
  dy[y] = 0;
  let queue = [y];
  while (queue.length) {
    let s = queue.shift();
    for (let ns of [s - n, s / 2, s / 3]) {
      if (ns === x) return dy[s] + 1;
      if (1 <= ns && Number.isInteger(ns)) {
        queue.push(ns);
        dy[ns] = Math.min(dy[ns], dy[s] + 1);
      }
    }
  }
  return answer;
}
