import { isSyntaxFormat, parseSyntax } from '../parser';

describe('Parser', () => {
  describe('isSyntaxFormat', () => {
    it('should identify syntax format', () => {
      expect(isSyntaxFormat('vis pie\ndata\n  - category A')).toBe(true);
      expect(isSyntaxFormat('data\n  - value 10')).toBe(true);
    });

    it('should identify JSON format', () => {
      expect(isSyntaxFormat('{"type": "pie"}')).toBe(false);
      expect(isSyntaxFormat('[{"value": 10}]')).toBe(false);
    });
  });

  describe('parseSyntax', () => {
    it('should parse basic pie chart syntax', () => {
      const syntax = `vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
theme academy
innerRadius 0.6`;

      const result = parseSyntax(syntax);

      expect(result.type).toBe('pie');
      expect(result.theme).toBe('academy');
      expect(result.innerRadius).toBe(0.6);
      expect(result.data).toHaveLength(2);
      expect(result.data?.[0]).toEqual({
        category: '分类一',
        value: 27,
      });
    });

    it('should parse boolean values', () => {
      const syntax = `vis bar
data
  - x A
    y 10
enabled true
disabled false`;

      const result = parseSyntax(syntax);

      expect(result.enabled).toBe(true);
      expect(result.disabled).toBe(false);
    });

    it('should parse number values', () => {
      const syntax = `vis line
count 100
percentage 95.5
negative -10`;

      const result = parseSyntax(syntax);

      expect(result.count).toBe(100);
      expect(result.percentage).toBe(95.5);
      expect(result.negative).toBe(-10);
    });

    it('should handle empty lines and comments', () => {
      const syntax = `vis pie
# This is a comment
data
  - category A
    value 10

theme default`;

      const result = parseSyntax(syntax);

      expect(result.type).toBe('pie');
      expect(result.theme).toBe('default');
      expect(result.data).toHaveLength(1);
    });
  });
});
