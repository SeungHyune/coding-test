function solution(land) {
  let result = Number.MIN_SAFE_INTEGER;

  const N = land.length;
  const M = land[0].length;

  const nx = [-1, 0, 1, 0];
  const ny = [0, 1, 0, -1];

  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  const map = new Map();

  let ascii = 65;

  for (let i = 0; i < M; i++) {
    let maxOil = 0;
    const checker = new Map();

    for (let j = 0; j < N; j++) {
      if (land[j][i] === 0) {
        continue;
      }

      if (typeof land[j][i] === "string") {
        if (checker.has(land[j][i])) {
          continue;
        }

        maxOil += map.get(land[j][i]);
        checker.set(land[j][i], true);

        continue;
      }

      if (visited[j][i]) continue;

      let oil = 1;

      visited[j][i] = true;

      const oilLocation = [[j, i]];

      const queue = [[j, i]];
      let index = 0;

      while (queue.length > index) {
        const [x, y] = queue[index++];

        for (let k = 0; k < 4; k++) {
          const dx = x + nx[k];
          const dy = y + ny[k];

          if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;
          if (visited[dx][dy] || land[dx][dy] === 0) continue;

          visited[dx][dy] = true;
          oil++;
          oilLocation.push([dx, dy]);
          queue.push([dx, dy]);
        }
      }

      for (const [x, y] of oilLocation) {
        land[x][y] = String.fromCharCode(ascii);
      }
      ascii++;

      map.set(land[j][i], oil);
      checker.set(land[j][i], true);

      maxOil += oil;
    }

    if (result < maxOil) {
      result = maxOil;
    }
  }

  return result;
}
