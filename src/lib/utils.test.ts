import { describe, it, expect } from 'vitest';
import { formatCurrency, formatNumber, calculateRatio } from './utils';

describe('formatCurrency', () => {
  describe('compact mode', () => {
    it('formats billions correctly', () => {
      expect(formatCurrency(1500000000, true)).toBe('$1.5B');
      expect(formatCurrency(42500000000, true)).toBe('$42.5B');
      expect(formatCurrency(1000000000, true)).toBe('$1.0B');
    });

    it('formats millions correctly', () => {
      expect(formatCurrency(42000000, true)).toBe('$42M');
      expect(formatCurrency(1000000, true)).toBe('$1M');
      expect(formatCurrency(500000000, true)).toBe('$500M');
    });

    it('formats thousands correctly', () => {
      expect(formatCurrency(5000, true)).toBe('$5K');
      expect(formatCurrency(26500, true)).toBe('$27K');
      expect(formatCurrency(100000, true)).toBe('$100K');
    });

    it('formats small amounts without suffix', () => {
      expect(formatCurrency(500, true)).toBe('$500');
      expect(formatCurrency(999, true)).toBe('$999');
    });
  });

  describe('non-compact mode', () => {
    it('formats with full number and commas', () => {
      expect(formatCurrency(1234567)).toBe('$1,234,567');
      expect(formatCurrency(42500000000)).toBe('$42,500,000,000');
      expect(formatCurrency(26500)).toBe('$26,500');
    });

    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0');
      expect(formatCurrency(0, true)).toBe('$0');
    });

    it('handles small numbers', () => {
      expect(formatCurrency(1)).toBe('$1');
      expect(formatCurrency(99)).toBe('$99');
    });
  });

  describe('edge cases', () => {
    it('handles negative numbers', () => {
      expect(formatCurrency(-1000)).toBe('-$1,000');
      // Compact mode doesn't handle negatives specially - falls through to non-compact
      expect(formatCurrency(-1000000, true)).toBe('-$1,000,000');
    });

    it('handles decimals (rounds to nearest integer)', () => {
      expect(formatCurrency(1234.56)).toBe('$1,235');
      expect(formatCurrency(1500000.49, true)).toBe('$2M');
    });
  });
});

describe('formatNumber', () => {
  it('formats numbers with commas', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
    expect(formatNumber(1234567890)).toBe('1,234,567,890');
    expect(formatNumber(42500000000)).toBe('42,500,000,000');
  });

  it('handles small numbers', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(999)).toBe('999');
  });

  it('handles large numbers', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(10000)).toBe('10,000');
    expect(formatNumber(100000)).toBe('100,000');
  });
});

describe('calculateRatio', () => {
  it('calculates simple ratios', () => {
    expect(calculateRatio(42500000000, 50000000)).toBe('850:1');
    expect(calculateRatio(1000, 10)).toBe('100:1');
    expect(calculateRatio(100, 1)).toBe('100:1');
  });

  it('rounds to nearest integer', () => {
    expect(calculateRatio(100, 3)).toBe('33:1');
    expect(calculateRatio(200, 3)).toBe('67:1');
  });

  it('handles equal values', () => {
    expect(calculateRatio(100, 100)).toBe('1:1');
  });

  it('handles fractions less than 1', () => {
    expect(calculateRatio(1, 2)).toBe('1:1'); // Rounds 0.5 to 1
    expect(calculateRatio(1, 10)).toBe('0:1');
  });
});
