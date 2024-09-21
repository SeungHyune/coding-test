function solution(triangle) {
  let arr = triangle.map((v) => [...v]);

  for (let i = 0; i < triangle.length - 1; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      let cur = arr[i][j];
      let left = triangle[i + 1][j];
      let right = triangle[i + 1][j + 1];
      if (arr[i + 1][j] < cur + left) arr[i + 1][j] = cur + left;
      if (arr[i + 1][j + 1] < cur + right) arr[i + 1][j + 1] = cur + right;
    }
  }

  let max = Math.max(...arr[arr.length - 1]);
  return max;
}
