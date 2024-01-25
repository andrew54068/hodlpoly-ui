import find2DArrayCenter from '../find2DArrayCenter';

export default function generatePath(size) {
  if (size <= 0) return [];

  // 初始化矩陣
  const matrix = Array.from({ length: size }, () => new Array(size).fill(0));

  // 找到中心點
  const [centerY, centerX] = find2DArrayCenter(matrix);
  let x = centerX, y = centerY;

  // 記錄起始點和結束點
  const startPoint = { x: centerX, y: centerY };
  let endPoint = { x: centerX, y: centerY };

  // 設置螺旋方向和步數
  const direction = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // 左, 下, 右, 上
  let currentDirection = 0, steps = 1;

  while (true) {
    for (let step = 0; step < steps; step++) {
      // 檢查是否超出邊界
      if (x < 0 || x >= size || y < 0 || y >= size) {
        return { matrix, startPoint, endPoint };
      }

      // 設置當前位置為1並更新結束點
      matrix[y][x] = 1;
      endPoint = { x, y };

      // 移動到下一個位置
      x += direction[currentDirection][0];
      y += direction[currentDirection][1];
    }

    // 更新方向和步數
    currentDirection = (currentDirection + 1) % 4;
    steps++; // 每次轉彎後增加步數
    if (x < 0 || x >= size || y < 0 || y >= size) break; // 檢查下一步是否超出邊界
  }

  return { matrix, startPoint, endPoint };
}
