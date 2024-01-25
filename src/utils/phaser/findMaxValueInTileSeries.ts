export default function findMaxInSeries(num: number): number {
  let sum = 1;
  let maxVal = 1;

  while (sum < num) {
    sum += maxVal;
    if (sum < num) {
      maxVal++;
    }
  }

  // count in the tile at the corner 
  return maxVal + 1;
}