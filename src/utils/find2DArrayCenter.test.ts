import find2DArrayCenter from './find2DArrayCenter'

const get2DArray = (width: number) => Array(width).fill(0).map(() => Array(width).fill(0));

describe('findCenter Function', () => {
  test('should find the center of an 8x8 array', () => {
    const matrix8x8 = get2DArray(8)
    console.log('matrix8x8 :', matrix8x8);
    const center = find2DArrayCenter(matrix8x8);
    expect(center).toEqual([3, 3]);
  });

  test('should find the center of a 4x4 array', () => {
    const matrix4x4 = get2DArray(4)
    console.log('matrix4x4 :', matrix4x4);
    const center = find2DArrayCenter(matrix4x4);
    expect(center).toEqual([1, 1]);
  });


  test('should find the center of a 10x10 array', () => {
    const matrix10x10 = get2DArray(10)
    console.log('matrix4x4 :', matrix10x10);
    const center = find2DArrayCenter(matrix10x10);
    expect(center).toEqual([4, 4]);
  });
});
