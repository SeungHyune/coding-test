function solution(order) {
  let answer = 0;
  let n = order.length;
  let result = [...order].reverse();
  let stack = [];

  let rpop;
  let spop;
  let i = 1;
  while (i <= n || rpop === spop) {
    if (i > n && rpop === undefined && spop === undefined) break;
    if (i === rpop) {
      answer++;
      i++;
      if (spop !== null) stack.push(spop);
    } else if (rpop === spop && rpop !== undefined) {
      answer++;
    } else {
      if (rpop !== undefined) result.push(rpop);
      if (spop !== undefined) stack.push(spop);

      if (i <= n) {
        stack.push(i);
        i++;
      }
    }
    rpop = result.pop();
    spop = stack.pop();
  }
  return answer;
}
