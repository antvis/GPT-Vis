import { CHART_STYLE_DEFAULTS } from './tokens';

export type ChartEnterAnimation = 'fadeIn' | 'pathIn' | 'growInX' | 'growInY' | 'waveIn';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getChartAnimation = (
  hasRendered: boolean,
  enterType?: ChartEnterAnimation,
): false | Record<string, unknown> => {
  if (hasRendered || prefersReducedMotion()) return false;

  return {
    enter: {
      ...(enterType ? { type: enterType } : {}),
      duration: CHART_STYLE_DEFAULTS.animationDuration,
      easing: 'ease-out',
    },
    update: { type: null },
    exit: { type: null },
  };
};
