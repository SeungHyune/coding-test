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
      this.heap[parentIndex][1] > this.heap[currentIndex]
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

const fs = require("fs");
let [[N], [M], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));
const [cityA, cityB] = arr.pop();

const graph = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => -1)
);
const visited = Array.from({ length: N }, () => Infinity);

for (const [a, b, c] of arr) {
  if (graph[a - 1][b - 1] === -1 || graph[a - 1][b - 1] > c) {
    graph[a - 1][b - 1] = c;
  }
}

const minHeap = new MinHeap();
minHeap.push([cityA - 1, 0, [cityA]]);

visited[cityA - 1] = 0;

let routeArr = [];

while (minHeap.size() > 0) {
  const [current, cost, route] = minHeap.pop();

  for (let k = 0; k < graph[current].length; k++) {
    if (graph[current][k] === -1) {
      continue;
    }

    const nextCost = graph[current][k];

    if (visited[k] > cost + nextCost) {
      visited[k] = cost + nextCost;
      minHeap.push([k, cost + nextCost, [...route, k + 1]]);

      if (cityB - 1 === k) {
        routeArr = [...route, k + 1];
      }
    }
  }
}

console.log(visited[cityB - 1]);
console.log(routeArr.length);
console.log(routeArr.join(" "));
