function solution(numbers) {
  let answer = Array.from({ length: numbers.length }, () => -1);
  for (let i = 1; i < numbers.length; i++) {
    let j = 1;
    while (numbers[i - j] < numbers[i] && i - j >= 0) {
      if (answer[i - j] === -1) {
        answer[i - j] = numbers[i];
      }
      j++;
    }
  }
  return answer;
}
