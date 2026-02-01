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

  it('should parse organization-chart with nested children', () => {
    const result = parse(`
vis organization-chart
data
  - name Alice Johnson
    description Chief Technology Officer
    children
      - name Bob Smith
        description Senior Software Engineer
        children
          - name Charlie Brown
            description Software Engineer
          - name Diana White
            description Software Engineer
      - name Eve Black
        description IT Support Department Head
        children
          - name Frank Green
            description IT Support Specialist
          - name Grace Blue
            description IT Support Specialist
    `);

    expect(result.type).toBe('organization-chart');
    expect(result.data).toEqual([
      {
        name: 'Alice Johnson',
        description: 'Chief Technology Officer',
        children: [
          {
            name: 'Bob Smith',
            description: 'Senior Software Engineer',
            children: [
              { name: 'Charlie Brown', description: 'Software Engineer' },
              { name: 'Diana White', description: 'Software Engineer' },
            ],
          },
          {
            name: 'Eve Black',
            description: 'IT Support Department Head',
            children: [
              { name: 'Frank Green', description: 'IT Support Specialist' },
              { name: 'Grace Blue', description: 'IT Support Specialist' },
            ],
          },
        ],
      },
    ]);
  });

  it('should parse organization-chart with simple nested children', () => {
    const result = parse(`
vis organization-chart
data
  - name Eric Joplin
    description Chief Executive Officer
    children
      - name Linda Newland
        description Chief Executive Assistant
    `);

    expect(result.type).toBe('organization-chart');
    expect(result.data).toEqual([
      {
        name: 'Eric Joplin',
        description: 'Chief Executive Officer',
        children: [{ name: 'Linda Newland', description: 'Chief Executive Assistant' }],
      },
    ]);
  });
});
