import { describe, expect, it } from 'vitest';
import { groupedExamplesData } from '../site/app/examples/examplesData';
import { isVisSyntax, parse } from '../src/syntax/parser';

type JsonConfig = Record<string, unknown>;

const charts = groupedExamplesData.flatMap((group) => group.charts);

function parseExample(source: string): JsonConfig {
  return isVisSyntax(source) ? parse(source) : { type: 'summary', content: source };
}

function expectRunnableConfig(config: JsonConfig, label: string) {
  expect(config, `${label} must survive JSON serialization`).toEqual(
    JSON.parse(JSON.stringify(config)),
  );
  expect(typeof config.type, `${label} must declare a chart type`).toBe('string');
}

describe('site example JSON and DSL', () => {
  it('stores runnable JSON beside every gallery DSL example', () => {
    for (const chart of charts) {
      const label = `${chart.id} gallery`;

      expect(chart.galleryJson, label).toEqual(parseExample(chart.galleryDsl));
      expectRunnableConfig(chart.galleryJson, label);
    }
  });

  it('stores runnable JSON beside every detail DSL example', () => {
    let exampleCount = 0;

    for (const chart of charts) {
      for (const example of chart.examples) {
        const label = `${chart.id} / ${example.title}`;

        expect(example.json, label).toEqual(parseExample(example.dsl));
        expectRunnableConfig(example.json, label);
        exampleCount += 1;
      }
    }

    expect(charts).toHaveLength(26);
    expect(exampleCount).toBe(84);
  });
});
