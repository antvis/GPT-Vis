import { describe, expect, it } from 'vitest';
import { compileCartesianAnnotations } from '../src/annotation/cartesian';
import { normalizeAnnotations } from '../src/annotation/normalize';
import { getAnnotationTheme } from '../src/annotation/theme';

const data = [
  { time: 'Q1', value: 80, group: 'North' },
  { time: 'Q2', value: 120, group: 'North' },
  { time: 'Q2', value: 145, group: 'South' },
];

const context = {
  data,
  getX: (datum: (typeof data)[number]) => datum.time,
  getY: (datum: (typeof data)[number]) => datum.value,
  getSeries: (datum: (typeof data)[number]) => datum.group,
  theme: getAnnotationTheme('default'),
};

describe('normalizeAnnotations', () => {
  it('keeps valid annotations and skips hidden annotations', () => {
    const result = normalizeAnnotations([
      { type: 'reference-line', channel: 'y', value: 100 },
      { type: 'reference-line', channel: 'y', value: 120, visible: false },
    ]);

    expect(result.annotations).toHaveLength(1);
    expect(result.diagnostics).toEqual([]);
  });

  it('rejects invalid numeric bands', () => {
    const result = normalizeAnnotations([
      { type: 'reference-band', channel: 'y', from: 110, to: 90 },
    ]);

    expect(result.annotations).toHaveLength(0);
    expect(result.diagnostics[0]?.code).toBe('INVALID_ANNOTATION_RANGE');
  });

  it('rejects a non-array annotations value without throwing', () => {
    const result = normalizeAnnotations({ type: 'reference-line' });

    expect(result.annotations).toEqual([]);
    expect(result.diagnostics[0]?.code).toBe('INVALID_ANNOTATIONS');
  });

  it('rejects malformed entries and unsupported annotation types', () => {
    const result = normalizeAnnotations([null, { type: 'custom', value: 100 }]);

    expect(result.annotations).toEqual([]);
    expect(result.diagnostics.map(({ code }) => code)).toEqual([
      'INVALID_ANNOTATIONS',
      'UNSUPPORTED_ANNOTATION_TYPE',
    ]);
  });

  it('rejects missing targets and non-string callout labels without throwing', () => {
    const result = normalizeAnnotations([
      { type: 'highlight' },
      { type: 'callout', target: { x: 'Q2' }, label: 31 },
    ]);

    expect(result.annotations).toEqual([]);
    expect(result.diagnostics.map(({ code }) => code)).toEqual([
      'INVALID_ANNOTATION_TARGET',
      'INVALID_ANNOTATION_VALUE',
    ]);
  });

  it('rejects invalid tones and non-string reference labels', () => {
    const result = normalizeAnnotations([
      { type: 'reference-line', channel: 'y', value: 100, tone: 'urgent' },
      { type: 'reference-line', channel: 'y', value: 100, label: 100 },
    ]);

    expect(result.annotations).toEqual([]);
    expect(result.diagnostics.map(({ code }) => code)).toEqual([
      'INVALID_ANNOTATION_VALUE',
      'INVALID_ANNOTATION_VALUE',
    ]);
  });
});

describe('compileCartesianAnnotations', () => {
  it('compiles reference annotations into background marks', () => {
    const result = compileCartesianAnnotations(
      [
        {
          type: 'reference-band',
          channel: 'y',
          from: 90,
          to: 110,
          label: 'Normal',
        },
        {
          type: 'reference-line',
          channel: 'y',
          value: 100,
          label: 'Target',
        },
      ],
      context,
    );

    expect(result.diagnostics).toEqual([]);
    expect(result.background.map(({ type }) => type)).toEqual(['rangeY', 'lineY']);
    expect(result.background[0].data).toEqual([[90, 110]]);
    expect(result.background[1].data).toEqual([100]);
    expect(result.background[1].labels[0]).toEqual(
      expect.objectContaining({
        background: true,
        backgroundFill: context.theme.background,
        backgroundFillOpacity: 1,
        backgroundPadding: [2, 4],
      }),
    );
    expect(result.background[1].labels[0].stroke).toBeUndefined();
  });

  it('resolves a unique series target for highlight and callout', () => {
    const result = compileCartesianAnnotations(
      [
        {
          type: 'highlight',
          target: { x: 'Q2', series: 'South' },
          tone: 'warning',
        },
        {
          type: 'callout',
          target: { x: 'Q2', series: 'South' },
          label: 'Growth 31%',
          tone: 'warning',
        },
      ],
      context,
    );

    expect(result.diagnostics).toEqual([]);
    expect(result.foreground).toHaveLength(2);
    expect(result.foreground[0].data).toEqual([{ __annotation_x__: 'Q2', __annotation_y__: 145 }]);
    expect(result.foreground[1].labels[0].text()).toBe('Growth 31%');
  });

  it('does not render ambiguous targets', () => {
    const result = compileCartesianAnnotations(
      [{ type: 'highlight', target: { x: 'Q2' } }],
      context,
    );

    expect(result.foreground).toHaveLength(0);
    expect(result.diagnostics[0]).toEqual(
      expect.objectContaining({ code: 'AMBIGUOUS_ANNOTATION_TARGET' }),
    );
  });
});
