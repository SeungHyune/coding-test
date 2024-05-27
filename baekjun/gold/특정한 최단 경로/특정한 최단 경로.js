// 1번 정점에서 N번 정점으로 최단 거리로 이동하려고 한다.
// 임의로 주어진 두 정점은 반드시 통과해야 한다.

// 한번 이동했던 정점, 간선 다시 이동할 수 있다.
// 1 => first => second => N
// 1 => second => first => N

const fs = require("fs");
let [[N, E], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));
let [first, second] = arr.pop();

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

for (const [a, b, c] of arr) {
  graph[a - 1].push([b - 1, c]);
  graph[b - 1].push([a - 1, c]);
}

function dijkstra(start, end) {
  const min = Math.min(start, end);
  const max = Math.max(start, end);

  const visited = Array.from({ length: N }, () => Infinity);
  visited[min] = 0;

  const minHeap = new MinHeap();
  minHeap.push([min, 0, [min + 1]]);

  while (minHeap.size() > 0) {
    const [current, cost, route] = minHeap.pop();

    if (current === max) break;

    for (let k = 0; k < graph[current].length; k++) {
      const [next, nextCost] = graph[current][k];

      if (visited[next] > cost + nextCost) {
        visited[next] = cost + nextCost;
        minHeap.push([next, cost + nextCost, [...route, next + 1]]);
      }
    }
  }

  return visited[max];
}

const sum1 =
  dijkstra(0, first - 1) +
  dijkstra(first - 1, second - 1) +
  dijkstra(second - 1, N - 1);
const sum2 =
  dijkstra(0, second - 1) +
  dijkstra(second - 1, first - 1) +
  dijkstra(first - 1, N - 1);

const result = Math.min(sum1, sum2);

if (result === Infinity) {
  console.log(-1);
} else {
  console.log(result);
}
