// N 명의 학생이 X 번 마을에 모여서 파티를 한다.
// M 개의 단방향 도로들이 있고 i 번째 길을 지나는데 T 시간을 소비한다.
// 각각의 학생들은 파티에 참석하기 위해 걸어가서 다시 그들의 마을로 돌아와야 한다.
// 이때 N 명의 학생들 중 최단 시간으로 오고 가는데 걸리는 학생 중 가장 많은 시간을 소비하는 학생은 누구일지 구하여라
// N => X => N

// 시작점과 끝점이 같은 도로는 없으며, 시작점과 한 도시 A에서 다른 도시 B로 가는 도로의 개수는 최대 1개이다.
// 모든 학생들은 집에서 X에 갈 수 있고, X에서 집으로 돌아올 수 있는 데이터만 입력으로 주어진다.

const fs = require("fs");
let [[N, M, X], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));

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

const graph = Array.from({ length: N }, () => []);
const visited = Array.from({ length: N }, () => Infinity);

for (const [x, y, d] of arr) {
  graph[x - 1].push([y - 1, d]);
}

let answer = 0;

for (let i = 0; i < N; i++) {
  if (i === X - 1) continue;

  const first = dijkstra(i, X - 1);
  const second = dijkstra(X - 1, i);

  answer = Math.max(answer, first + second);
}

function dijkstra(start, end) {
  const visited = Array.from({ length: N }, () => Infinity);

  const minHeap = new MinHeap();
  minHeap.push([start, 0]);

  while (minHeap.size() > 0) {
    const [current, distance] = minHeap.pop();

    if (current === end) break;

    for (let k = 0; k < graph[current].length; k++) {
      const [next, nextDistance] = graph[current][k];

      if (visited[next] > distance + nextDistance) {
        visited[next] = distance + nextDistance;
        minHeap.push([next, distance + nextDistance]);
      }
    }
  }

  return visited[end];
}

console.log(answer);
