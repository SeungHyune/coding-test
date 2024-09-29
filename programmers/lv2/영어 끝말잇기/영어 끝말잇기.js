function solution(n, words) {
  let word = [];
  for (let i = 0; i < words.length; i++) {
    let pop = word.pop();
    if (pop !== undefined) {
      if (pop[pop.length - 1] === words[i][0] && !word.includes(words[i])) {
        word.push(pop);
        word.push(words[i]);
      } else return [(i % n) + 1, Math.ceil((i + 1) / n)];
    } else word.push(words[i]);
  }
  return [0, 0];
}
