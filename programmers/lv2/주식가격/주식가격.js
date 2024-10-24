function solution(prices) {
  const result = [];

  for (let i = 0; i < prices.length; i++) {
    const currentPrice = prices[i];

    let maxSecond = 0;
    let second = 0;

    for (let j = i + 1; j < prices.length; j++) {
      const futurePrice = prices[j];

      if (currentPrice <= futurePrice) {
        second++;

        if (maxSecond < second) {
          maxSecond = second;
        }
      } else {
        second = 0;
      }
    }

    result.push(maxSecond);
  }

  return result;
}
