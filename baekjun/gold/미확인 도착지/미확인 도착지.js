// 예술가 한 쌍이 한 도시의 거리를 이동하고 있다.
// 나의 임무는 그들이(예술가 한 쌍) 어디로 가는지 알아내는 것이다.
// 그들은 S 지점에서 출발했다, 그리고 목적지 후보들 중 하나가 그들의 목적지이다
// 그들은 급하기 때문에 최단거리로 목적지까지 이동한다고 확신한다.

// 그들이 보이지 않는다. 나의 후각은 개 만큼 뛰어나다.
// 후각으로 그들이 g와 h 교차로 사이에 있는 도로를 지나갔다는 것을 알아냈다.
// 이 듀오는 어디로 가고 있는 것일까?

// 첫 번째 줄 = n - 교차로의 개수, m - 도로의 개수 , t - 목적지 후보의 개수
// 두 번째 줄 = s - 예술가들의 출발지, g !== h

// m개의 줄 마다 3개의 정수 a,b,d가 주어진다.
// a와 b 사이에 길이 d의 양방향 도로가 있다는 뜻이다.

// 그 다음 t개의 각줄마다 x가 주어지는데, t개의 목적지 후보들을 의미한다.
// 이 t개의 지점들은 서로 다른 위치이며 모두 s와 같지 않다.

// 교차로 사이에는 도로가 많아봐야 1개이다. m개의 줄 중에서 g와 h 사이의 도로를 나타낸 것이 존재한다.
// 이 도로는 목적지 후보들 중 적어도 1개로 향하는 최단 경로의 일부이다.

// 입력에서 주어진 목적지 후보들 중 불가능한 경우들을 제외한 목적지들을 공백으로 분리시킨 오름차순 정수들로 출력한다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);

    if (this.size() === 1) return;

    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      currentIndex > 0 &&
      this.heap[parentIndex][1] > this.heap[currentIndex][1]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;

      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();

    let currentIndex = 0;
    let leftChild = currentIndex * 2 + 1;
    let rightChild = currentIndex * 2 + 2;

    while (
      (currentIndex < this.size() &&
        this.heap[leftChild] &&
        this.heap[currentIndex][1] > this.heap[leftChild][1]) ||
      (this.heap[rightChild] &&
        this.heap[currentIndex][1] > this.heap[rightChild][1])
    ) {
      if (
        !this.heap[rightChild] ||
        this.heap[rightChild][1] > this.heap[leftChild][1]
      ) {
        this.swap(currentIndex, leftChild);
        currentIndex = leftChild;
      } else {
        this.swap(currentIndex, rightChild);
        currentIndex = rightChild;
      }

      leftChild = currentIndex * 2 + 1;
      rightChild = currentIndex * 2 + 2;
    }

    return value;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  size() {
    return this.heap.length;
  }
}

let [[T], ...arr] = input.map((a) => a.split(" ").map(Number));

let index = 0;

while (T-- > 0) {
  const [n, m, t] = arr[index];
  const [s, g, h] = arr[++index];

  const graph = Array.from({ length: n }, () => []);

  for (let i = index + 1; i <= m + index; i++) {
    const [a, b, d] = arr[i];

    graph[a - 1].push([b - 1, d]);
    graph[b - 1].push([a - 1, d]);
  }

  index = index + m + 1;

  let goal = [];

  for (let i = index; i < index + t; i++) {
    const goalNumber = arr[i];

    const goalS = dijkstra(s - 1, goalNumber - 1, n, graph);
    const goalG = dijkstra(g - 1, goalNumber - 1, n, graph);
    const goalH = dijkstra(h - 1, goalNumber - 1, n, graph);

    if (goalS[goalNumber - 1] === Infinity) continue;

    if (
      goalS[goalNumber - 1] ===
        goalS[g - 1] + goalG[h - 1] + goalH[goalNumber - 1] ||
      goalS[goalNumber - 1] ===
        goalS[h - 1] + goalH[g - 1] + goalG[goalNumber - 1]
    ) {
      goal.push(...goalNumber);
    }
  }

  goal.sort((a, b) => a - b);

  console.log(goal.join(" "));

  index += t;
}

function dijkstra(start, end, n, graph) {
  const visited = Array.from({ length: n }, () => Infinity);

  visited[start] = 0;

  const minHeap = new MinHeap();
  minHeap.push([start, 0]);

  while (minHeap.size() > 0) {
    const [current, distance] = minHeap.pop();

    if (current === end) {
      break;
    }

    for (let k = 0; k < graph[current].length; k++) {
      const [next, nextDistance] = graph[current][k];

      if (visited[next] > distance + nextDistance) {
        visited[next] = distance + nextDistance;
        minHeap.push([next, distance + nextDistance]);
      }
    }
  }

  return visited;
}
