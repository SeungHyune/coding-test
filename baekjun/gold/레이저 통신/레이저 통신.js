// 지도의 각 칸은 빈 칸이거나 벽이며, 두 칸은 'c'로 표시되어 있는 칸이다.
// 'c'로 표시되어 있는 두 칸을 레이저로 통신하기 위해서 설치해야 하는 거울 개수의 최솟값을 구해라
// 레이저로 통신한다는 것은 두 칸을 레이저로 연결할 수 있음을 의미한다.

// 레이저는 C에서만 발사할 수 있고, 빈 칸에 거울을 설치해서 방향을 90도 회전시킬 수 있다.

// 빈 칸 = . , 벽 = *, c: 레이저로 연결해야 하는 칸
// 'C'는 항상 두 개이고, 레이저로 연결할 수 있는 입력만 주어진다.

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
      this.heap[parentIndex][3] > this.heap[currentIndex][3]
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
        this.heap[currentIndex][3] > this.heap[leftChild][3]) ||
      (this.heap[rightChild] &&
        this.heap[currentIndex][3] > this.heap[rightChild][3])
    ) {
      if (
        !this.heap[rightChild] ||
        this.heap[rightChild][3] > this.heap[leftChild][3]
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

const [W, H] = input.shift().split(" ").map(Number);
const arr = input.map((a) => a.split(""));

const nx = [-1, 0, 1, 0];
const ny = [0, 1, 0, -1];

let answer = Number.MAX_SAFE_INTEGER;

const visited = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => Infinity)
);

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (arr[i][j] === "." || arr[i][j] === "*") continue;

    visited[i][j] = 0;

    const minHeap = new MinHeap();
    minHeap.push([i, j, "", 0]);

    while (minHeap.size() > 0) {
      const [x, y, distance, count] = minHeap.pop();

      if (answer <= count) continue;

      if (arr[x][y] === "C" && (i !== x || j !== y) && answer > count) {
        answer = count;
        break;
      }

      for (let k = 0; k < 4; k++) {
        const dx = x + nx[k];
        const dy = y + ny[k];

        if (dx < 0 || dy < 0 || dx >= H || dy >= W) continue;

        if (arr[dx][dy] === "*") continue;

        if (distance === k || distance === "") {
          if (visited[dx][dy] >= count) {
            minHeap.push([dx, dy, k, count]);
            visited[dx][dy] = count;
          }
        } else if (visited[dx][dy] > count + 1) {
          minHeap.push([dx, dy, k, count + 1]);
          visited[dx][dy] = count + 1;
        }
      }
    }
  }
}

console.log(answer);
