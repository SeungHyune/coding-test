function solution(sequence, k) {
  let answer = [];
  let left = 0;
  let right = 0;
  let sum = sequence[0];
  while (left <= right && right < sequence.length) {
    if (sum === k) {
      answer.push([left, right]);
      right++;
      sum += sequence[right];
    } else if (sum < k) {
      right++;
      sum += sequence[right];
    } else if (sum > k) {
      sum -= sequence[left];
      left++;
    }
  }

  answer.sort((a, b) => {
    let A = Math.abs(a[0] - a[1]);
    let B = Math.abs(b[0] - b[1]);
    if (A === B) return a[0] - b[0];
    else return A - B;
  });

  return answer[0];
}
