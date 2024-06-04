const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input.shift());
const arr = input.map((a) => a.split("").map(Number));

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
      this.heap[parentIndex][2] > this.heap[currentIndex][2]
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
        this.heap[currentIndex][2] > this.heap[leftChild][2]) ||
      (this.heap[rightChild] &&
        this.heap[currentIndex][2] > this.heap[rightChild][2])
    ) {
      if (
        !this.heap[rightChild] ||
        this.heap[rightChild][2] > this.heap[leftChild][2]
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

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => Infinity)
);
visited[0][0] = 0;

const minHeap = new MinHeap();
minHeap.push([0, 0, 0]);

while (minHeap.size() > 0) {
  const [x, y, w] = minHeap.pop();

  if (x === N - 1 && y === N - 1) break;

  for (let k = 0; k < 4; k++) {
    const dx = x + nx[k];
    const dy = y + ny[k];

    if (dx < 0 || dy < 0 || dx >= N || dy >= N) continue;

    if (arr[dx][dy] === 1 && visited[dx][dy] > w) {
      // 그냥 갈 수 있는 경로
      visited[dx][dy] = w;
      minHeap.push([dx, dy, w]);
    } else if (arr[dx][dy] === 0 && visited[dx][dy] > w + 1) {
      // 검은방을 깨고 가야하는 경로
      visited[dx][dy] = w + 1;
      minHeap.push([dx, dy, w + 1]);
    }
  }
}

console.log(visited[N - 1][N - 1]);
