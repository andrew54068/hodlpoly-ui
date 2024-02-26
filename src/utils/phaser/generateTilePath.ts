import find2DArrayCenter from '../find2DArrayCenter';
import findMaxValueInTileSeries from './findMaxValueInTileSeries';

export default function generateTilePath(tileNumbers: number): {
  matrix: string[][],
  matrixWithId: string[][]
  startPoint: { x: number, y: number },
  endPoint: { x: number, y: number }
  pathXY?: { x: number, y: number }[]
} {

  if (tileNumbers <= 0) {
    throw new Error('tileNumbers must be greater than 0');
  }

  const arraySize = findMaxValueInTileSeries(tileNumbers);
  console.log('arraySize :', arraySize);

  // Throws an error if the array size is not positive


  // Initialize the matrix with all elements as empty strings " "
  const matrix = Array.from({ length: arraySize }, () => new Array(arraySize).fill(" "));
  const matrixWithId = Array.from({ length: arraySize }, () => new Array(arraySize).fill(" "));

  // Find the center of the array\
  const arrayCenter = find2DArrayCenter(matrix);


  // Return default values if the center is not found
  if (!arrayCenter) {
    return {
      matrix,
      matrixWithId,
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 0, y: 0 },
    }
  }

  let tileCount = 0
  const pathXY: { x: number, y: number }[] = [];
  const [centerX, centerY] = arrayCenter;
  let x = centerX, y = centerY;

  // Records the starting and ending points
  const startPoint = { x: centerX, y: centerY };
  let endPoint = { x: centerX, y: centerY };

  // Set the spiral direction and steps
  const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Left, Down, Right, Up
  let currentDirection = 0, steps = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let step = 0; step < steps; step++) {
      // Check if it's out of bounds

      if (tileCount >= tileNumbers) {
        console.log('matrixWithId :', matrixWithId);
        return { matrix, startPoint, endPoint, pathXY, matrixWithId };
      }

      //check the bound 
      if (x < 0 || x >= arraySize || y < 0 || y >= arraySize) {
        return { matrix, startPoint, endPoint, pathXY, matrixWithId };
      }

      // Set the current position to "1" and update the endpoint
      matrix[y][x] = "1";
      matrixWithId[x][y] = tileCount
      pathXY.push({ x, y });
      tileCount += 1
      endPoint = { x, y };

      // Move to the next position
      x += direction[currentDirection][0];
      y += direction[currentDirection][1];
    }

    // Update direction and steps
    currentDirection = (currentDirection + 1) % 4;
    steps++; // Increase steps after each turn
    if (x < 0 || x >= arraySize || y < 0 || y >= arraySize) break; // Check if the next step is out of bounds
  }

  console.log('matrixWithId :', matrixWithId);
  return { matrix, startPoint, endPoint, pathXY, matrixWithId };
}
