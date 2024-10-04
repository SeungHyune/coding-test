function solution(number, k) {
  let stack = [];
  number = number.split("").reverse();
  while (number.length && k > 0) {
    let spop = stack.shift();
    let npop = number.pop();
    if (spop < npop) {
      k--;
      stack.push(npop);
    } else {
      stack.push(spop);
      stack.push(npop);
    }
  }
  console.log(stack);
}
