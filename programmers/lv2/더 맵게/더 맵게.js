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

function solution(scoville, K) {
  let answer = 0;
  let flag = false;

  const minHeap = new MinHeap();
  for (const num of scoville) {
    minHeap.push(num);
  }

  while (minHeap.size() > 0) {
    const num1 = minHeap.pop();
    const num2 = minHeap.pop();

    if (num1 >= K) {
      flag = true;
      break;
    }

    if (!num2) {
      break;
    }

    const sum = num1 + num2 * 2;
    minHeap.push(sum);

    answer++;

    const check = minHeap.pop();
    if (check >= K) {
      flag = true;
      break;
    }

    minHeap.push(check);
  }

  return flag ? answer : -1;
}
