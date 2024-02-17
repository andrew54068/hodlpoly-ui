import getHeatMapColors from './getHeatMapColors'; // Adjust the import path as necessary


describe('getHeatMapColors', () => {
  it('should correctly classify prices into 5 grades', () => {
    const prices = [10, 20, 30, 40, 50];
    const expected = [0, 1, 2, 3, 4];
    expect(getHeatMapColors(prices)).toEqual(expected);
  });

  it('should return an empty array for an empty input', () => {
    expect(getHeatMapColors([])).toEqual([]);
  });

  it('should handle an array where all values are the same but not maximum', () => {
    const prices = [20, 20, 20, 20, 20];
    const expected = [0, 0, 0, 0, 0]; // Since they are all equal but not the single maximum value
    expect(getHeatMapColors(prices)).toEqual(expected);
  });

  it('should return all 0s if every price is the maximum value', () => {
    const prices = [50, 50, 50, 50, 50]; // Triggering `hasNoHighest`
    const expected = [0, 0, 0, 0, 0]; // Since `hasNoHighest` is true
    expect(getHeatMapColors(prices)).toEqual(expected);
  });

  it('should handle cases with high and low extremes', () => {
    const prices = [1, 1000, 5000, 10000, 10001, 50000];
    const expected = [0, 0, 0, 0, 1, 4]; // Adjust if necessary based on the grading logic
    expect(getHeatMapColors(prices)).toEqual(expected);
  });

});
