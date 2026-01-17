import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  describe('basic class combination', () => {
    it('combines multiple classes', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
      expect(cn('a', 'b', 'c')).toBe('a b c');
    });

    it('handles single class', () => {
      expect(cn('foo')).toBe('foo');
    });

    it('handles empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
    });
  });

  describe('conditional classes', () => {
    it('filters out falsy values', () => {
      expect(cn('base', false && 'conditional')).toBe('base');
      expect(cn('base', null, undefined, 'valid')).toBe('base valid');
    });

    it('includes truthy conditionals', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional');
    });

    it('handles complex conditionals', () => {
      const isActive = true;
      const isDisabled = false;
      expect(cn(
        'btn',
        isActive && 'btn-active',
        isDisabled && 'btn-disabled'
      )).toBe('btn btn-active');
    });
  });

  describe('Tailwind class conflict resolution', () => {
    it('resolves padding conflicts (later wins)', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('resolves margin conflicts', () => {
      expect(cn('m-2', 'm-4')).toBe('m-4');
      expect(cn('mt-2', 'mt-4')).toBe('mt-4');
    });

    it('resolves color conflicts', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
      expect(cn('bg-white', 'bg-gray-100')).toBe('bg-gray-100');
    });

    it('keeps non-conflicting classes', () => {
      expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
    });

    it('resolves flex/grid conflicts', () => {
      expect(cn('flex', 'block')).toBe('block');
      expect(cn('hidden', 'block')).toBe('block');
    });
  });

  describe('array inputs', () => {
    it('handles arrays of classes', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar');
      expect(cn(['a', 'b'], 'c')).toBe('a b c');
    });
  });

  describe('object inputs', () => {
    it('handles object syntax', () => {
      expect(cn({ foo: true, bar: false })).toBe('foo');
      expect(cn({ foo: true, bar: true })).toBe('foo bar');
    });
  });
});
