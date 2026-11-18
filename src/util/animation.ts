import { CHART_STYLE_DEFAULTS } from './tokens';

export type ChartEnterAnimation = 'fadeIn' | 'pathIn' | 'growInX' | 'growInY' | 'waveIn';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getChartAnimation = (
  hasRendered: boolean,
  enterType?: ChartEnterAnimation,
): false | Record<string, unknown> => {
  if (prefersReducedMotion()) return false;

  const type = hasRendered ? 'fadeIn' : enterType;

  return {
    enter: {
      ...(type ? { type } : {}),
      duration: CHART_STYLE_DEFAULTS.animationDuration,
      easing: 'ease-out',
    },
    update: hasRendered
      ? {
          type: 'morphing',
          duration: CHART_STYLE_DEFAULTS.animationDuration,
          easing: 'ease-out',
        }
      : { type: null },
    exit: hasRendered ? { type: 'fadeOut', duration: 120 } : { type: null },
  };
};
