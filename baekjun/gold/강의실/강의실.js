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
      this.heap[parentIndex] > this.heap[currentIndex]
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
        this.heap[currentIndex] > this.heap[leftChild]) ||
      (this.heap[rightChild] && this.heap[currentIndex] > this.heap[rightChild])
    ) {
      if (
        !this.heap[rightChild] ||
        this.heap[rightChild] > this.heap[leftChild]
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
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N], ...arr] = input.map((a) => a.split(" ").map(Number));

const room = new MinHeap();

arr.sort((a, b) => a[1] - b[1]).reverse();

let result = 0;

while (arr.length) {
  const [number, start, end] = arr.pop();

  let roomC = room.pop();

  while (room.size() > 0 && roomC <= start) {
    roomC = room.pop();
  }

  if (roomC > start) {
    room.push(roomC);
  }

  room.push(end);

  result = Math.max(result, room.size());
}

console.log(result);
