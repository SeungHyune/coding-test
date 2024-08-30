function solution(k, tangerine) {
  let answer = 0;
  let map = new Map();
  for (const a of tangerine) {
    if (map.has(a)) map.set(a, map.get(a) + 1);
    else map.set(a, 1);
  }
  let mapArr = Array.from(map);
  mapArr.sort((a, b) => b[1] - a[1]);

  let sum = 0;
  for (let [key, val] of mapArr) {
    sum += val;
    answer++;
    if (sum >= k) return answer;
  }
  return answer;
}
