function solution(tickets) {
  // 인접 리스트로 그래프를 구성합니다.
  const graph = {};
  for (const [src, dest] of tickets) {
    if (graph[src] === undefined) {
      graph[src] = [];
    }
    graph[src].push(dest);
  }

  for (const key in graph) {
    // 역순으로 문자열들을 정렬합니다.
    graph[key].sort((a, b) => (a > b ? -1 : 1));
  }

  const stack = ["ICN"]; // DFS를 위한 스택
  const answer = []; // 경로를 저장하기 위한 리스트
  while (stack.length > 0) {
    // DFS 시작
    const src = stack[stack.length - 1]; // Top 요소를 확인합니다.

    // 갈 수 있는 경로가 있다면
    if (graph[src] && graph[src].length > 0) {
      // 갈 수 있는 경로 중 알파벳 순으로 앞선 것을 먼저 방문합니다.
      // 역순으로 정렬했기에 pop을 하면 알파벳 순입니다.
      stack.push(graph[src].pop());
    } else {
      // 더 이상 갈 수 있는 경로가 없다면
      // 경로를 추가합니다.
      answer.push(stack.pop());
    }
  }

  // 스택 결과를 넣은 것이기 때문에 역순으로 결과를 반환합니다.
  return answer.reverse();
}
