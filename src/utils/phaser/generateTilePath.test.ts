import generateTilePath from './generateTilePath';

describe('generateTilePath Function', () => {
  test('should correctly generate a path for a 10x10 array', () => {
    const { matrix, startPoint, endPoint } = generateTilePath(10);
    console.log('startPoint :', startPoint);
    console.log('endPoint :', endPoint);
    expect(matrix).toBeInstanceOf(Array);
    expect(matrix.length).toBe(10);
    expect(matrix.every(row => row.length === 10)).toBeTruthy();

    // Check startPoint and endPoint
    expect(startPoint).toEqual({ x: 4, y: 4 });
    expect(endPoint.x).toBeLessThanOrEqual(9);
    expect(endPoint.y).toBeLessThanOrEqual(9);

    // Additional checks for the pattern can be added here
  });

  test('should correctly generate a path for a 30x30 array', () => {
    const { matrix, startPoint, endPoint } = generateTilePath(30);

    expect(matrix).toBeInstanceOf(Array);
    expect(matrix.length).toBe(30);
    expect(matrix.every(row => row.length === 30)).toBeTruthy();

    // Check startPoint and endPoint
    expect(startPoint).toEqual({ x: 14, y: 14 });
    expect(endPoint.x).toBeLessThanOrEqual(29);
    expect(endPoint.y).toBeLessThanOrEqual(29);

    // Additional checks for the pattern can be added here
  });

  test('should throw an error for non-positive array sizes', () => {
    expect(() => generateTilePath(-1)).toThrow('arraySize must be greater than 0');
    expect(() => generateTilePath(0)).toThrow('arraySize must be greater than 0');
  });

  // Additional tests for other array sizes and edge cases can be added here
});
