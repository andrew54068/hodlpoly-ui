export function fixDecimal(value: number, n: number): number {
  return parseFloat(value.toFixed(n));
}