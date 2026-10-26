import { describe, expect, it } from 'vitest';
import { THEME_EXAMPLES } from '../../../../site/app/themes/examples';
import { CHART_TYPES } from '../../../../src/theme/chart-types';

type JsonConfig = Record<string, unknown>;

function expectRunnableConfig(config: JsonConfig, label: string) {
  expect(config, `${label} must survive JSON serialization`).toEqual(
    JSON.parse(JSON.stringify(config)),
  );
  expect(typeof config.type, `${label} must declare a chart type`).toBe('string');
}

describe('Theme Studio examples', () => {
  it('covers every chart once without local style or theme overrides', () => {
    expect(THEME_EXAMPLES.map((example) => example.type).sort()).toEqual([...CHART_TYPES].sort());
    for (const example of THEME_EXAMPLES) {
      if (typeof example.input === 'string') {
        expect(example.type).toBe('summary');
        expect(example.input).not.toMatch(/^theme\s/m);
      } else {
        expect(example.input.style).toBeUndefined();
        expect(example.input.theme).toBeUndefined();
        expectRunnableConfig(example.input, `theme gallery / ${example.type}`);
      }
    }
  });
});
