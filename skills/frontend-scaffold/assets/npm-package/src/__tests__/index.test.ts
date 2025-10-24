import { hello } from '../index';

describe('hello function', () => {
  test('should return greeting with name', () => {
    expect(hello('World')).toBe('Hello, World!');
  });

  test('should handle empty string', () => {
    expect(hello('')).toBe('Hello, !');
  });
});