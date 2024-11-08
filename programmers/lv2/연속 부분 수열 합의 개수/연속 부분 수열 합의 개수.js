function solution(elements) {
  let arr = [...elements];
  let n = elements.length;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      let k = j;
      while (true) {
        sum += elements[k % n];
        k++;
        if (k === i + j) break;
      }
      arr.push(sum);
    }
  }

  let set = new Set(arr);
  return set.size;
}
