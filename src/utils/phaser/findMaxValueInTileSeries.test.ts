// Import the function to test
import findMaxInSeries from './findMaxValueInTileSeries';

// Describe block for the test suite
describe('findMaxInSeries Function Tests', () => {
  test('should return the correct max value in the series for a number 9', () => {
    expect(findMaxInSeries(9)).toBe(5); // 1+1+2+3+4 = 11, 4+1 = 5
  });

  test('should return the correct max value in the series for a number 10', () => {
    expect(findMaxInSeries(10)).toBe(5);
  });

  test('should return the correct max value in the series for a number 11', () => {
    expect(findMaxInSeries(11)).toBe(5);
  });

  test('should return the correct max value in the series for a number 1', () => {
    expect(findMaxInSeries(1)).toBe(2); // Series starts from 1
  });

  // Test case for a larger input number
  test('should return the correct max value in the series for a number 9', () => {
    expect(findMaxInSeries(30)).toBe(9); // 2+3+4+5+6+7 = 27, and 8 would make 35, 8 + 1 =9 
  });

});
