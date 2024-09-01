function solution(topping) {
  let answer = 0;
  let map = new Map();
  for (const a of topping) {
    if (map.has(a)) map.set(a, map.get(a) + 1);
    else map.set(a, 1);
  }

  let map2 = new Map();
  for (const a of topping) {
    if (map.has(a)) {
      map.set(a, map.get(a) - 1);
      if (map.get(a) === 0) map.delete(a);
    }

    if (map2.has(a)) map2.set(a, map.get(a) + 1);
    else map2.set(a, 1);

    if (map.size === map2.size) answer++;
  }

  return answer;
}
