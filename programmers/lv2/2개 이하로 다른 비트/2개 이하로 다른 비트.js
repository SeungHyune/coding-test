function solution(numbers) {
  let answer = [];
  for (let i = 0; i < numbers.length; i++) {
    let binary = numbers[i].toString(2);
    let num = 0;
    for (let j = binary.length - 1; j >= 0; j--) {
      if (binary[j] === "0") {
        break;
      }
      if (binary[j] === "1") num++;
    }
    if (num === 0) num = 1;
    answer.push(numbers[i] + 2 ** (num - 1));
  }
  return answer;
}
