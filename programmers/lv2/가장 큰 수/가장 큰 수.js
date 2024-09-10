function solution(numbers) {
  numbers = numbers.map((v) => v + "");
  numbers.sort((a, b) => b + a - (a + b));
  if (Number(numbers.join("")) === 0) return "0";
  return numbers.join("");
}
