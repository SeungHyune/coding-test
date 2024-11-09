function solution(n, k) {
  let answer = 0;
  let string = n.toString(k);
  let arr = [];
  let num = "";
  for (const a of string) {
    if (a > 0) num += a;
    else if (a === "0") {
      arr.push(num);
      num = "";
    }
  }

  if (num.length > 0) arr.push(num);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 1) {
      let flag = 1;
      for (let j = 2; j <= Math.sqrt(arr[i]); j++) {
        if (arr[i] % j === 0) {
          flag = 0;
          break;
        }
      }
      if (flag) answer++;
    }
  }
  return answer;
}
