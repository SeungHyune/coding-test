function solution(land) {
  let dy = Array.from({ length: land.length }, () => Array(4).fill(0));
  dy[0] = [...land[0]];

  for (let i = 1; i < land.length; i++) {
    for (let j = 0; j < land[i].length; j++) {
      let num = land[i][j];
      for (let k = 0; k < 4; k++) {
        if (j !== k) dy[i][j] = Math.max(dy[i][j], dy[i - 1][k] + num);
      }
    }
  }
  return Math.max(...dy.at(-1));
}
