import { describe, expect, it } from 'vitest';
import { mergeAnnotations } from '../../src/annotation/merge';
import { prepareAnnotations, type RendererAnnotation } from '../../src/annotation/registry';
import { getAnnotationStyle } from '../../src/theme/annotation';
import { getThemeObject } from '../../src/theme/g2';

const rows = [
  { time: 1, value: 10 },
  { time: 2, value: 30 },
  { time: 3, value: 20 },
];
type Row = (typeof rows)[number];
const source = {
  chartType: 'line' as const,
  mapping: { x: 'time' as const, y: 'value' as const, data: rows },
  defaults: getAnnotationStyle(getThemeObject('line')),
};

describe('annotation preparation', () => {
  it('expands real semantic components and groups highlights without losing styles, labels or mark order', () => {
    const annotations: RendererAnnotation<Row, 'g2'>[] = [
      { type: 'point', data: { time: 1 }, label: 'First' },
      { type: 'point', data: { time: 2 }, label: 'Second' },
      { type: 'topN', n: 2, style: { stroke: '#f00' } },
      { type: 'path', data: { value: 15 }, label: 'Reference' },
      { type: 'minY', label: 'Lowest', style: { stroke: '#00f' } },
      { type: 'point', data: { time: 3 }, label: 'Third' },
    ];
    const prepared = prepareAnnotations<Row, 'g2'>('g2', annotations, source);
    expect(prepared.map(({ annotation }) => annotation.type)).toEqual([
      'point',
      'point',
      'highlight',
      'highlight',
      'highlight',
      'path',
      'point',
    ]);
    // The source-only context has no scene or createMark: preparation cannot draw.
    expect(prepared.every(({ draw }) => typeof draw === 'function')).toBe(true);
    const groups = mergeAnnotations(prepared);
    expect(groups.map(({ annotations }) => annotations.map(({ label }) => label))).toEqual([
      ['First', 'Second'],
      ['Top 1', 'Top 2', 'Lowest'],
      ['Reference'],
      ['Third'],
    ]);
    const highlights = groups[1].annotations.filter(
      (annotation) => annotation.type === 'highlight',
    );
    expect(highlights.map(({ style }) => style?.stroke)).toEqual(['#f00', '#f00', '#00f']);
    expect(highlights[0].data).toEqual([rows[1]]);
    expect(groups[0].annotations[0]).toBe(annotations[0]);
    expect(prepared.map(({ annotation }) => annotation)).toContain(annotations[3]);
  });

  it('rejects unsupported types before executing any prepared drawing', () => {
    const annotations = [
      { type: 'point', data: { time: 1 } },
      { type: 'unknown', data: { time: 2 } },
    ] as unknown as RendererAnnotation<Row, 'g2'>[];
    expect(() => prepareAnnotations<Row, 'g2'>('g2', annotations, source)).toThrow(
      'Unsupported line annotation type: unknown',
    );
  });

  it.each([
    { type: 'point', data: { time: 1 } },
    { type: 'maxY' },
    { type: 'thresholdHighlight', threshold: 15 },
  ] satisfies RendererAnnotation<Row, 'g2'>[])(
    'rejects %j on pie even though its renderer is G2',
    (annotation) => {
      expect(() =>
        prepareAnnotations<Row, 'g2'>('g2', [annotation], { ...source, chartType: 'pie' }),
      ).toThrow(`Unsupported pie annotation type: ${annotation.type}.`);
    },
  );

  it('rejects charts that have not integrated annotations', () => {
    expect(() =>
      prepareAnnotations<Row, 'g2'>('g2', [{ type: 'highlight', data: rows[0] }], {
        ...source,
        chartType: 'radar',
      }),
    ).toThrow('Unsupported radar annotation type: highlight.');
  });

  it('validates the whole batch before calculating semantic selections', () => {
    expect(() =>
      prepareAnnotations<Row, 'g2'>('g2', [{ type: 'topN', n: 0 }, { type: 'peak' }], {
        ...source,
        chartType: 'column',
      }),
    ).toThrow('Unsupported column annotation type: peak.');
  });
});
