function solution(priorities, location) {
  let result = 0;
  const N = priorities.length;
  const arr = [];

  for (let i = 65; i < 65 + N; i++) {
    const alphabet = String.fromCharCode(i);

    arr.push(alphabet);
  }

  const findAlphabet = arr[location];
  let maxNumber = Math.max(...priorities);

  while (priorities.length > 0) {
    if (priorities[0] === maxNumber) {
      result++;
      priorities.shift();
      if (findAlphabet === arr.shift()) break;

      maxNumber = Math.max(...priorities);
    } else {
      priorities.push(priorities.shift());
      arr.push(arr.shift());
    }
  }

  return result;
}
