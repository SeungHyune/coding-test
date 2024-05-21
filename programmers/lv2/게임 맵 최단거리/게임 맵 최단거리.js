function solution(maps) {
  let n = maps.length;
  let m = maps[0].length;

  let nx = [-1, 0, 1, 0];
  let ny = [0, 1, 0, -1];
  let queue = [];
  queue.push([0, 0]);

  while (queue.length) {
    let [x, y] = queue.shift();
    for (let k = 0; k < 4; k++) {
      let dx = x + nx[k];
      let dy = y + ny[k];
      if (dx >= 0 && dx < n && dy >= 0 && dy < m && maps[dx][dy] === 1) {
        if (maps[dx][dy] === 1) maps[dx][dy] = maps[x][y] + 1;
        else maps[dx][dy] = Math.min(maps[dx][dy], maps[x][y] + 1);
        queue.push([dx, dy]);
      }
    }
  }

  return maps[n - 1][m - 1] === 1 ? -1 : maps[n - 1][m - 1];
}
