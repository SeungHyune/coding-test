function dirsChk(map, prev, cur) {
  let flag = 1;
  if (map.has(prev)) {
    let val = map.get(prev);
    if (!val.includes(cur)) {
      val.push(cur);
      map.set(prev, [...val]);
    } else flag = 0;
  } else map.set(prev, [cur]);
  return flag;
}

function solution(dirs) {
  let answer = 0;
  let b = { U: 0, R: 1, D: 2, L: 3 };
  let nx = [-1, 0, 1, 0];
  let ny = [0, 1, 0, -1];
  let x = 5,
    y = 5;

  let map = new Map();
  for (const a of dirs) {
    let prev = String(x) + String(y);
    let dx = x + nx[b[a]];
    let dy = y + ny[b[a]];
    let cur = String(dx) + String(dy);
    if (dx >= 0 && dx <= 10 && dy >= 0 && dy <= 10) {
      x = dx;
      y = dy;
      if (map.has(prev) || map.has(cur)) {
        let flag = 1;
        if (dirsChk(map, prev, cur) === 0 || dirsChk(map, cur, prev) === 0)
          flag = 0;
        if (flag) answer++;
      } else {
        answer++;
        map.set(prev, [cur]);
        map.set(cur, [prev]);
      }
    }
  }
  return answer;
}
