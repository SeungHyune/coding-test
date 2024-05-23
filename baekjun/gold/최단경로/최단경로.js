class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(data) {
    if (this.size() === 0) {
      this.heap.push(data);
      return;
    }

    this.heap.push(data);
    let checkedIdx = this.heap.length - 1;

    while (checkedIdx > 0) {
      let parentIdx = Math.floor((checkedIdx - 1) / 2);
      if (this.heap[parentIdx][1] > this.heap[checkedIdx][1]) {
        this.swap(parentIdx, checkedIdx);
        checkedIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.size() === 0) return;
    if (this.size() === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIdx = 0;

    while (currentIdx < this.size()) {
      let left = currentIdx * 2 + 1;
      let right = left + 1;

      if (!this.heap[left]) break;

      let smaller =
        this.heap[right] !== undefined
          ? this.heap[left][1] <= this.heap[right][1]
            ? left
            : right
          : left;

      if (this.heap[smaller][1] < this.heap[currentIdx][1]) {
        this.swap(smaller, currentIdx);
        currentIdx = smaller;
      } else {
        break;
      }
    }

    return value;
  }
}

const fs = require("fs");
let [[V, E], [K], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));

const graph = Array.from({ length: V }, () => []);
const visited = Array.from({ length: V }, () => "INF");

for (const [x, y, d] of arr) {
  graph[x - 1].push([y - 1, d]);
}

visited[K - 1] = 0;
const minHeap = new MinHeap();
minHeap.push([K - 1, 0]);

while (minHeap.size() > 0) {
  const [current, distance] = minHeap.pop();

  for (let k = 0; k < graph[current].length; k++) {
    const [next, d] = graph[current][k];

    if (visited[next] === "INF" || visited[next] > distance + d) {
      visited[next] = distance + d;
      minHeap.push([next, distance + d]);
    }
  }
}

console.log(visited.join("\n"));
