function solution(cacheSize, cities) {
  let answer = 0;
  let cache = Array.from({ length: cacheSize }, () => 0);
  cities.forEach((cities) => {
    let city = cities.toUpperCase();
    let index = cache.indexOf(city);

    if (index > -1) {
      // cache 배열에 도시가 있는 경우
      answer += 1;
      for (let i = index; i >= 1; i--) {
        cache[i] = cache[i - 1];
      }
    } else {
      // cache 배열에 도시가 없는 경우
      answer += 5;
      for (let i = cacheSize - 1; i >= 1; i--) {
        cache[i] = cache[i - 1];
      }
    }
    if (cacheSize > 0) cache[0] = city;
  });
  return answer;
}
