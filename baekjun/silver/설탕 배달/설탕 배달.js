// 상근이는 설탕공장에서 설탕을 배달하고 있다.
// 상근이는 설탕을 정확하게 N킬로그램을 배달해야 한다.
// 설탕공장에서 만드는 설탕은 봉지에 담겨져 있다.
// 봉지는 3킬로그램 봉지와 5킬로그램 봉지가 있다.

// 상근이는 귀찮기 때문에, 최대한 적은 봉지를 들고 가려고 한다.
// ex ) 18kg 배달 = 3kg는 6개지만 5kg 3개와 3kg 1개를 배달하면 더 적은 개수의 봉지를 배달할 수 있다.
// 상근이가 정확하게 N킬로그램 배달해야 할 때, 봉지 몇 개를 가져가면 되는지 그 수를 구해라

// 만약 정확하게 N킬로그램을 만들 수 없다면 -1을 출력한다.

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const sugar = Number(input);

const dp = Array.from({ length: sugar + 1 }, () => Infinity);
dp[0] = 0;

for (const kg of [3, 5]) {
  for (let i = kg; i <= sugar; i++) {
    if (dp[i - kg] === Infinity) continue;

    if (dp[i] === 0) {
      dp[i] = dp[i - kg] + 1;
    } else {
      dp[i] = Math.min(dp[i], dp[i - kg] + 1);
    }
  }
}

dp[sugar] === Infinity ? console.log(-1) : console.log(dp[sugar]);
