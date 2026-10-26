import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Summary } from '../../src/vis/summary';
import { MockElement, textInstances } from '../helpers/renderers';

vi.mock('@antv/t8', async () => ({ Text: (await import('../helpers/renderers')).MockText }));

describe('render - summary theme', () => {
  beforeEach(() => {
    textInstances.length = 0;
    vi.stubGlobal('Element', MockElement);
    vi.stubGlobal('document', {
      createElement: () => new MockElement(),
      head: new MockElement(),
      querySelector: () => null,
    });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it('passes resolved summary styles to T8', () => {
    const container = new MockElement();
    Summary({
      container: container as unknown as HTMLElement,
      theme: {
        id: 'summary-test',
        label: 'Summary test',
        baseTheme: 'dark',
        style: {
          backgroundColor: '#10131a',
          summary: {
            fontFamily: 'Georgia, serif',
            colorMetricValue: '#2563eb',
          },
        },
      },
    }).render('# Revenue');

    const wrapper = container.children[0];
    expect(wrapper.style).toMatchObject({ backgroundColor: '#10131a', padding: '16px' });
    expect(textInstances[0].themeArgs).toEqual([
      'dark',
      expect.objectContaining({
        fontFamily: 'Georgia, serif',
        colorMetricValue: '#2563eb',
      }),
    ]);
    expect(textInstances[0].syntax).toBe('# Revenue');
  });
});
