import generatePath from './generatePath';

describe('generatePath Tests', () => {
  test('should create a spiral with 3 ones', () => {
    const result = generatePath(3);
    const expected = [["1", "1"], [" ", "1"]];
    expect(result).toEqual(expected);
  });

  test('should create a spiral with 5 ones', () => {
    const result = generatePath(5);
    const expected = [["1", "1"], [" ", "1"], ["1", "1"]];
    expect(result).toEqual(expected);
  });

  test('should create a spiral with 8 ones', () => {
    const result = generatePath(8);
    const expected = [["1", "1", "1"], [" ", " ", "1"], ["1", "1", "1"]];
    expect(result).toEqual(expected);
  });
});
