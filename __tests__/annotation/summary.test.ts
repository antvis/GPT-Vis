import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation/summary';
import { getAnnotationDefaults } from '../../src/theme/annotation';
import type { SummaryAnnotation } from '../../src/types/annotation';

afterEach(() => vi.unstubAllGlobals());

describe('summary text target resolution', () => {
  it.each([
    [{ text: 'Missing' }, 'not found'],
    [{ text: 'Revenue' }, 'ambiguous'],
    [{ text: '' }, 'nonempty'],
    [[], 'needs text'],
    [{ text: '18%Revenue' }, 'not found'],
  ])('rejects invalid or ambiguous text before changing T8 nodes: %j', (data, error) => {
    const first = {},
      second = {};
    const nodes = [
      { data: 'Revenue grew ', parentElement: { closest: () => first } },
      { data: '18%', parentElement: { closest: () => first } },
      { data: 'Revenue remained strong', parentElement: { closest: () => second } },
    ];
    let index = -1;
    const createElement = vi.fn();
    vi.stubGlobal('NodeFilter', { SHOW_TEXT: 4 });
    vi.stubGlobal('document', {
      createTreeWalker: () => ({
        nextNode: () => ++index < nodes.length,
        get currentNode() {
          return nodes[index];
        },
      }),
      createElement,
    });
    expect(() =>
      bindAnnotations(
        {} as HTMLElement,
        {} as HTMLElement,
        [{ type: 'highlight', data } as SummaryAnnotation],
        getAnnotationDefaults('summary'),
      ),
    ).toThrow(error);
    expect(createElement).not.toHaveBeenCalled();
  });
});
