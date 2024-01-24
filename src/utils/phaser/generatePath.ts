export default function generatePath(numOnes) {
  // 根據 "1" 的數量計算矩陣的尺寸
  const size = Math.ceil(Math.sqrt(numOnes));
  let matrix = Array.from({ length: size }, () => new Array(size).fill(" "));

  let direction = 'right';
  let row = 0, col = -1;
  let count = 0;

  while (count < numOnes) {
    if (direction === 'right') {
      while (col + 1 < size && count < numOnes) {
        matrix[row][++col] = "1";
        count++;
      }
      direction = 'down';
    } else if (direction === 'down') {
      while (row + 1 < size && count < numOnes) {
        matrix[++row][col] = "1";
        count++;
      }
      direction = 'left';
    } else if (direction === 'left') {
      while (col - 1 >= 0 && count < numOnes) {
        matrix[row][--col] = "1";
        count++;
      }
      direction = 'up';
    } else if (direction === 'up') {
      while (row - 1 >= 0 && count < numOnes) {
        matrix[--row][col] = "1";
        count++;
      }
      if (row > 0 || col > 0) {
        direction = 'right';
      }
    }

    if (count === numOnes) {
      break;
    }
  }

  // Trim unused rows and columns
  matrix = matrix.filter(row => row.some(cell => cell === "1"));
  matrix.forEach(row => {
    const lastIndex = row.lastIndexOf("1");
    row.splice(lastIndex + 1);
  });

  return matrix;
}
