function solution(places) {
  const answer = [];
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  // 응시자 주변을 탐색하고 응시자 주변(2칸 이내) 다른 응시자를 발견하면 false를 반환
  function bfs(start, place) {
    const visited = Array.from({ length: 5 }, () => Array(5).fill(0));
    const queue = [start];

    while (queue.length > 0) {
      const [x, y, d] = queue.shift();
      if (visited[x][y] === 0) {
        visited[x][y] = 1;

        if (d && place[x][y] === "P") {
          return false;
        }

        for (let k = 0; k < 4; k++) {
          const nx = x + dx[k];
          const ny = y + dy[k];

          if (nx < 0 || nx > 4 || ny < 0 || ny > 4) continue;
          if (d < 2 && place[nx][ny] !== "X") {
            queue.push([nx, ny, d + 1]);
          }
        }
      }
    }
    return true;
  }

  places.forEach((place) => {
    let hasDistance = 1;
    outer: for (let i = 0; i < place.length; i++) {
      for (let j = 0; j < place[i].length; j++) {
        if (place[i][j] === "P" && !bfs([i, j, 0], place)) {
          hasDistance = 0;
          break outer;
        }
      }
    }
    answer.push(hasDistance);
  });
  return answer;
}
