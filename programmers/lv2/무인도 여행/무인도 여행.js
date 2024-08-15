function solution(maps) {
  let answer = [];
  let n = maps.length;
  let m = maps[0].length;
  let nx = [-1, 0, 1, 0];
  let ny = [0, 1, 0, -1];
  maps = maps.map((v) => v.split(""));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let queue = [];
      let sum = 0;
      let flag = 0;
      if (maps[i][j] > 0) {
        flag = 1;
        queue.push([i, j]);
        while (queue.length) {
          let [x, y] = queue.shift();

          for (let k = 0; k < 4; k++) {
            let dx = x + nx[k];
            let dy = y + ny[k];
            if (dx >= 0 && dx < n && dy >= 0 && dy < m && maps[dx][dy] > 0) {
              queue.push([dx, dy]);
              sum += Number(maps[dx][dy]);
              maps[dx][dy] = 0;
            }
          }
        }
        if (flag && sum === 0) sum = Number(maps[i][j]);
        answer.push(sum);
      }
    }
  }

  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}
