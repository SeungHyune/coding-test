const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

while (true) {
  const [N, M] = input.shift().split(" ").map(Number);

  if (N === 0 && M === 0) break;

  const NArray = input.splice(0, N).map(Number);
  const MArray = input.splice(0, M).map(Number);

  let [NPoint, MPoint] = [0, 0];

  let result = 0;

  while (true) {
    const NValue = NArray[NPoint];
    const MValue = MArray[MPoint];

    if (NValue === MValue) {
      result++;
      NPoint++;
      MPoint++;
    } else if (NValue < MValue) {
      NPoint++;
    } else {
      MPoint++;
    }

    if (NPoint >= N || MPoint >= M) {
      break;
    }
  }

  console.log(result);
}
