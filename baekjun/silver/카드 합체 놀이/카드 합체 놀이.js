const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N, M], [...arr]] = input.map((a) => a.split(" ").map(Number));

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && value < this.heap[parentIndex]) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[currentIndex];
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    const value = this.heap[1];
    if (this.size() === 2) return this.heap.pop();
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftChild = currentIndex * 2;
    let rightChild = currentIndex * 2 + 1;
    while (
      this.heap[currentIndex] > this.heap[leftChild] ||
      this.heap[currentIndex] > this.heap[rightChild]
    ) {
      const temp = this.heap[currentIndex];

      if (this.heap[leftChild] > this.heap[rightChild]) {
        this.heap[currentIndex] = this.heap[rightChild];
        this.heap[rightChild] = temp;
        currentIndex = rightChild;
      } else {
        this.heap[currentIndex] = this.heap[leftChild];
        this.heap[leftChild] = temp;
        currentIndex = leftChild;
      }

      leftChild = currentIndex * 2;
      rightChild = currentIndex * 2 + 1;
    }

    return value;
  }
}

const heap = new MinHeap();

for (const num of arr) {
  heap.push(num);
}

let i = M;

while (i-- > 0) {
  const firstNum = heap.pop();
  const secondNum = heap.pop();

  heap.push(firstNum + secondNum);
  heap.push(firstNum + secondNum);
}

const result = [...heap.heap];
result.shift();
const resultSum = result.reduce((prev, cur) => BigInt(prev) + BigInt(cur), 0);
console.log(resultSum.toString());
