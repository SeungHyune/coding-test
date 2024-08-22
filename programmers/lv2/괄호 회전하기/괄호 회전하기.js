function solution(s) {
  let answer = 0;
  s = s.split("");
  for (let i = 0; i < s.length; i++) {
    const shift = s.shift();
    s.push(shift);

    const stack = [];
    let flag = true;
    for (const a of s) {
      if (a === "(" || a === "{" || a === "[") stack.push(a);
      else {
        const pop = stack.pop();
        if (pop === undefined) {
          flag = false;
          break;
        }
        if (
          (a === ")" && pop !== "(") ||
          (a === "}" && pop !== "{") ||
          (a === "]" && pop !== "[")
        ) {
          flag = false;
          break;
        }
      }
    }

    if (stack.length === 0 && flag) answer++;
  }
  return answer;
}
