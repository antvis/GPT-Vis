import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - organization-chart', () => {
  it('should parse basic organization-chart', () => {
    const result = parse(`
vis organization-chart
data
  - name Alice Johnson
    description Chief Technology Officer
    `);

    expect(result.type).toBe('organization-chart');
    expect(result.data).toEqual([
      { name: 'Alice Johnson', description: 'Chief Technology Officer' },
    ]);
  });

  it('should parse organization-chart with multiple nodes', () => {
    const result = parse(`
vis organization-chart
data
  - name Eric Joplin
    description Chief Executive Officer
  - name Linda Newland
    description Chief Executive Assistant
    `);

    expect(result.type).toBe('organization-chart');
    expect(result.data).toEqual([
      { name: 'Eric Joplin', description: 'Chief Executive Officer' },
      { name: 'Linda Newland', description: 'Chief Executive Assistant' },
    ]);
  });

  it('should parse organization-chart with team structure', () => {
    const result = parse(`
vis organization-chart
data
  - name Bob Smith
    description Senior Software Engineer
  - name Charlie Brown
    description Software Engineer
  - name Diana White
    description Software Engineer
    `);

    expect(result.type).toBe('organization-chart');
    expect(result.data).toHaveLength(3);
  });
});
