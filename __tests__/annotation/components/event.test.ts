import { describe, expect, it } from 'vitest';
import { event } from '../../../src/annotation/components/event';
import { getAnnotationStyle } from '../../../src/theme/annotation';
import { getThemeObject } from '../../../src/theme/g2';
import type { Annotation } from '../../../src/types/annotation';

type Row = { time: number; revenue: number; group: string };
const data: Row[] = [
  { time: 0, revenue: 10, group: 'A' },
  { time: 2, revenue: 30, group: 'A' },
  { time: 2, revenue: 40, group: 'B' },
];
const defaults = getAnnotationStyle(getThemeObject('line'));
function resolve(options: Omit<Extract<Annotation<Row>, { type: 'event' }>, 'type'>) {
  return event.g2([{ type: 'event', ...options }], {
    chartType: 'line',
    mapping: { x: 'time', y: 'revenue', data },
    defaults,
  });
}

describe('event', () => {
  it('resolves a unique business selector onto the requested axis', () => {
    expect(resolve({ data: { time: 2, group: 'A' }, axis: 'y' })).toMatchObject([
      { data: { revenue: 30 } },
    ]);
    expect(() => resolve({ data: { group: 'A' } })).toThrow('expected one');
    expect(() => resolve({ data: { group: 'Missing' } })).toThrow('matches no data');
  });

  it('accepts explicit positions independently of observed values', () => {
    expect(resolve({ data: [{ time: 1 }, { time: 3 }] })).toMatchObject([
      { data: { time: 1 } },
      { data: { time: 3 } },
    ]);
  });

  it('rejects empty selectors and nonfinite coordinates', () => {
    expect(() => resolve({ data: [] })).toThrow('target data');
    expect(() => resolve({ data: {} })).toThrow('nonempty');
    expect(() => resolve({ data: { time: Infinity } })).toThrow('finite');
  });
});
