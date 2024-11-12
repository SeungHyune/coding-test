function solution(n, left, right) {
  let answer = [];
  let min = Math.floor(left / n);
  let max = Math.ceil(right / n);
  let nl = left % n;
  let lr = right - left;
  for (let i = min; i < max; i++) {
    let k = i + 1;
    for (let j = 1; j <= n; j++) {
      if (k < j) k++;
      answer.push(k);
    }
  }

  if (n >= left) return answer.splice(left, lr + 1);
  else return answer.splice(nl, lr + 1);
}
