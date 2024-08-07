function solution(want, number, discount) {
  let answer = 0;
  let n = discount.length - 10;
  let map = new Map();
  want.forEach((fruit, index) => map.set(fruit, number[index]));

  for (let i = 0; i <= n; i++) {
    let fruitMap = new Map(map);
    for (let j = i; j < i + 10; j++) {
      let fruit = discount[j];
      if (fruitMap.has(fruit)) {
        fruitMap.set(fruit, fruitMap.get(fruit) - 1);
      }
    }
    let arr = [...fruitMap];
    if (arr.filter((item) => item[1] <= 0).length === number.length) {
      answer++;
    }
  }
  return answer;
}
