import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation/summary';
import { Summary } from '../../src/vis/summary';
import { MockElement, textInstances } from '../helpers/renderers';

vi.mock('@antv/t8', async () => ({ Text: (await import('../helpers/renderers')).MockText }));
vi.mock('../../src/annotation/summary', () => ({ bindAnnotations: vi.fn(() => vi.fn()) }));

describe('render - summary theme', () => {
  beforeEach(() => {
    textInstances.length = 0;
    vi.mocked(bindAnnotations).mockClear();
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
  it('accepts a named preset through construction options', () => {
    const container = new MockElement();
    Summary({ container: container as unknown as HTMLElement, theme: 'pop' }).render('# Revenue');
    expect(container.children[0].style.backgroundColor).toBe('#fffdf5');
    expect(textInstances[0].themeArgs).toEqual([
      'light',
      expect.objectContaining({ colorMetricValue: '#a90055', fontSize: 15 }),
    ]);
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

  it('accepts the object API, passes targets to the renderer and clears labels on rerender and destroy', () => {
    const container = new MockElement();
    const instance = Summary({ container: container as unknown as HTMLElement });
    const annotations = [
      { type: 'highlight' as const, data: { text: 'Revenue' }, label: 'Explanation' },
    ];
    instance.render({ type: 'summary', text: '# Revenue', annotations });
    expect(textInstances[0].syntax).toBe('# Revenue');
    expect(bindAnnotations).toHaveBeenLastCalledWith(
      container.children[0],
      expect.any(MockElement),
      annotations,
      expect.objectContaining({ highlight: expect.any(Object) }),
    );
    const cleanup = vi.mocked(bindAnnotations).mock.results.at(-1)!.value;
    instance.render('# Updated');
    expect(cleanup).toHaveBeenCalledOnce();
    expect(container.children).toHaveLength(1);
    const finalCleanup = vi.mocked(bindAnnotations).mock.results.at(-1)!.value;
    instance.destroy();
    instance.destroy();
    expect(finalCleanup).toHaveBeenCalledOnce();
    expect(container.children).toHaveLength(0);
  });

  it('keeps the rendered content when a new highlight target is invalid', () => {
    const container = new MockElement();
    const instance = Summary({ container: container as unknown as HTMLElement });
    instance.render('# Existing');
    const wrapper = container.children[0];
    vi.mocked(bindAnnotations).mockImplementationOnce(() => {
      throw new Error('Invalid annotation: text not found.');
    });
    expect(() =>
      instance.render({
        text: '# New',
        annotations: [{ type: 'highlight', data: { text: 'Missing' } }],
      }),
    ).toThrow('text not found');
    expect(container.children).toEqual([wrapper]);
  });
});
