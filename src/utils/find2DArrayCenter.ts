

export default function find2DArrayCenter(matrix) {
  if (!matrix.length || !matrix[0].length) {
    return null;
  }

  const rows = matrix.length;
  console.log('rows :', rows);
  const cols = matrix[0].length;
  console.log('cols :', cols);

  const centerRow = Math.floor(rows / 2 - 1);
  const centerCol = Math.floor(cols / 2 - 1);

  return [centerRow, centerCol];
}