import generateTilePath from './generateTilePath';

describe('generateTilePath Function', () => {
  test('should correctly generate a path for a 10x10 array', () => {
    const { pathXY } = generateTilePath(10);
    expect(pathXY).toBeInstanceOf(Array);
    expect(pathXY?.length).toBe(10);

  });

  test('should correctly generate a path array with 30 tiles', () => {
    const { matrix, endPoint, pathXY } = generateTilePath(30);
    console.log('pathXY?.length :', pathXY?.length);
    console.log('endPoint :', endPoint);
    console.log('matrix :', matrix);

    expect(matrix).toBeInstanceOf(Array);
    expect(pathXY?.length).toBe(30);

  });

  test('should throw an error for non-positive tileNumbers', () => {
    expect(() => generateTilePath(-1)).toThrow('tileNumbers must be greater than 0');
    expect(() => generateTilePath(0)).toThrow('tileNumbers must be greater than 0');
  });

  // Additional tests for other array sizes and edge cases can be added here
});
