import { stdlib } from '@antv/g2';
import { ExtensionCategory, getExtensions } from '@antv/g6';
import { describe, expect, it } from 'vitest';

import { G2_BUILT_IN_MARK_SHAPES } from '../src/types/style/g2-marks';
import {
  G6_BUILT_IN_EDGE_TYPES,
  G6_BUILT_IN_NODE_TYPES,
  GPT_VIS_G6_EDGE_TYPES,
  GPT_VIS_G6_NODE_TYPES,
} from '../src/types/style/g6-elements';

const sorted = (values: readonly string[]) => [...values].sort();

describe('style capabilities', () => {
  it('matches the registered G2 shapes exposed by stdlib', () => {
    const library = stdlib();

    for (const mark of [
      'line',
      'area',
      'point',
      'interval',
      'box',
      'text',
      'path',
      'density',
      'link',
      'connector',
    ] as const) {
      expect(sorted(G2_BUILT_IN_MARK_SHAPES[mark])).toEqual(
        sorted(Object.keys(library[`mark.${mark}`].props!.shape!)),
      );
    }
  });

  it('matches the built-in G6 node and edge registries', () => {
    expect(sorted(G6_BUILT_IN_NODE_TYPES)).toEqual(
      sorted(Object.keys(getExtensions(ExtensionCategory.NODE))),
    );
    expect(sorted(G6_BUILT_IN_EDGE_TYPES)).toEqual(
      sorted(Object.keys(getExtensions(ExtensionCategory.EDGE))),
    );
  });

  it('keeps theme-selectable G6 nodes data-independent', () => {
    expect(G6_BUILT_IN_NODE_TYPES).toEqual(expect.arrayContaining([...GPT_VIS_G6_NODE_TYPES]));
    expect(GPT_VIS_G6_NODE_TYPES).not.toContain('html');
    expect(GPT_VIS_G6_NODE_TYPES).not.toContain('image');
    expect(GPT_VIS_G6_NODE_TYPES).not.toContain('donut');
  });

  it('keeps theme-selectable G6 edges layout-independent', () => {
    expect(G6_BUILT_IN_EDGE_TYPES).toEqual(expect.arrayContaining([...GPT_VIS_G6_EDGE_TYPES]));
    expect(GPT_VIS_G6_EDGE_TYPES).not.toContain('cubic-horizontal');
    expect(GPT_VIS_G6_EDGE_TYPES).not.toContain('cubic-vertical');
    expect(GPT_VIS_G6_EDGE_TYPES).not.toContain('cubic-radial');
  });
});
