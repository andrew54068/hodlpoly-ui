import BigNumber from 'bignumber.js';

export default function getHeatMapColors(allLandPrices: number[]) {
  if (allLandPrices.length === 0) return [];

  const maxVal = BigNumber.maximum(...allLandPrices);
  const minVal = BigNumber.minimum(...allLandPrices);


  // Calculate the size of each step
  const stepSize = maxVal.minus(minVal).dividedBy(5); // Divide by 5 to get five grades

  // Function to determine the grade for a price
  const getGrade = (price) => {
    const priceBN = new BigNumber(price);
    for (let i = 1; i <= 4; i++) {
      const threshold = minVal.plus(stepSize.multipliedBy(i));
      console.log('threshold :', threshold);
      if (priceBN.isLessThanOrEqualTo(threshold)) {
        return i - 1; // Adjusted to get grades from 0 to 4
      }
    }
    return 4; // For the highest grade
  };

  // Map each price to its corresponding grade
  return allLandPrices.map(price => getGrade(price));
}