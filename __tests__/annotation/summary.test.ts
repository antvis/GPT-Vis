import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
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
    const options = {
      renderer: 'summary' as const,
      container: {} as HTMLElement,
      content: {} as HTMLElement,
      annotations: [{ type: 'highlight', data } as SummaryAnnotation],
      defaults: getAnnotationDefaults('summary'),
      // Extra fields must not reroute Summary annotations to the Table runtime.
      data: [],
    };
    expect(() => bindAnnotations(options)).toThrow(error);
    expect(createElement).not.toHaveBeenCalled();
  });
});
