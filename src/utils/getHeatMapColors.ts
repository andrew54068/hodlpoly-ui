import BigNumber from 'bignumber.js';

export default function getHeatMapColors(allLandPrices: number[]) {
  if (allLandPrices.length === 0) return [];
  const uniquePrices = [...new Set(allLandPrices)].sort((a, b) => new BigNumber(a).minus(b).toNumber());
  const uniqueCount = uniquePrices.length;

  const maxVal = BigNumber.maximum(...allLandPrices);
  const minVal = BigNumber.minimum(...allLandPrices);


  // Determine the number of steps based on the number of unique prices, max 4 steps
  const steps = Math.min(uniqueCount - 1, 4);

  // Calculate the size of each step
  const stepSize = maxVal.minus(minVal).dividedBy(Math.max(steps, 1)); // Ensure division is not by 0
  const hasNoHighest = uniquePrices.every(price => new BigNumber(price).isEqualTo(maxVal));
  // Function to determine the grade for a price
  const getGrade = (price) => {
    if (hasNoHighest) return 0;

    const priceBN = new BigNumber(price);
    for (let i = 1; i <= 4; i++) {
      const threshold = minVal.plus(stepSize.multipliedBy(i));
      if (priceBN.isLessThan(threshold)) {
        return i - 1; // Adjusted to get grades from 0 to 4
      }
    }
    return 4; // For the highest grade
  };

  // Map each price to its corresponding grade
  return allLandPrices.map(price => getGrade(price));
}