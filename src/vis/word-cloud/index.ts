import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import { resolveChartLocale } from '../../util/chart-components';
import { getThemeObject, normalizePalette } from '../../util/theme';

const WORD_CLOUD_MAX_WORDS = 50;
const WORD_CLOUD_FONT_FAMILY = 'Impact';
const WORD_CLOUD_ROTATIONS = [-90, -60, -30, 0, 30, 60] as const;

const WORD_CLOUD_LABELS = {
  'en-US': {
    rank: 'Rank',
    share: 'Share of total weight',
    weight: 'Weight / frequency',
  },
  'zh-CN': {
    rank: '排名',
    share: '占总权重',
    weight: '权重 / 词频',
  },
} as const;

type PreparedWordCloudDataItem = WordCloudDataItem & {
  fontWeight: number;
  rank: number;
  share: number;
  wordColor: string;
};

const hashWordCloudData = (data: WordCloudDataItem[]): number => {
  let hash = 2166136261;

  data.forEach(({ text, value }) => {
    const input = `${text}\u0000${value}\u0001`;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
  });

  return hash >>> 0;
};

const createSeededRandom = (seed: number): (() => number) => {
  let state = seed || 1;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const getWordCloudPalette = (palette: string[] | undefined, theme: VisualizationTheme): string[] =>
  normalizePalette(palette, theme);

const prepareWordCloudData = (
  data: WordCloudDataItem[],
  colors: string[],
): PreparedWordCloudDataItem[] => {
  const rankedData = data
    .map((item, index) => ({ item, index }))
    .filter(
      ({ item }) => item.text.trim().length > 0 && Number.isFinite(item.value) && item.value > 0,
    )
    .sort((a, b) => b.item.value - a.item.value || a.index - b.index);
  const totalWeight = rankedData.reduce((sum, { item }) => sum + item.value, 0);
  const visibleData = rankedData.slice(0, WORD_CLOUD_MAX_WORDS);
  const lastVisibleIndex = Math.max(1, visibleData.length - 1);
  const colorByText = new Map<string, string>();
  let nextColorIndex = 0;

  return visibleData.map(({ item }, index) => {
    const percentile = index / lastVisibleIndex;
    const fontWeight =
      percentile <= 0.1 ? 700 : percentile <= 0.32 ? 600 : percentile <= 0.68 ? 500 : 400;

    let wordColor = colorByText.get(item.text);

    if (!wordColor) {
      wordColor = colors[nextColorIndex % colors.length];
      colorByText.set(item.text, wordColor);
      nextColorIndex += 1;
    }

    return {
      ...item,
      rank: index + 1,
      share: totalWeight > 0 ? item.value / totalWeight : 0,
      fontWeight,
      wordColor,
    };
  });
};

/**
 * WordCloudDataItem is the type for each data item in the word cloud chart.
 */
export type WordCloudDataItem = {
  text: string;
  value: number;
};

/**
 * WordCloudConfig defines the configuration for rendering the word cloud chart.
 */
export interface WordCloudConfig {
  type?: 'word-cloud';
  data: WordCloudDataItem[];
  theme?: VisualizationTheme;
  title?: string;
  locale?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * WordCloudInstance represents a word cloud chart instance with render and destroy methods.
 */
export interface WordCloudInstance {
  render: (config: WordCloudConfig) => void;
  destroy: () => void;
}

/**
 * WordCloud chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const wordCloud = WordCloud({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * wordCloud.render({
 *   type: 'word-cloud',
 *   data: [
 *     { text: '环境', value: 20 },
 *     { text: '保护', value: 15 },
 *     { text: '可持续发展', value: 10 },
 *   ],
 *   theme: 'academy'
 * });
 *
 * wordCloud.destroy();
 * ```
 */
export const WordCloud = (options: VisualizationOptions): WordCloudInstance => {
  const { container, width, height, locale, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the word cloud chart with the given configuration.
   */
  const render = (config: WordCloudConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      locale: renderLocale = locale,
      style = {},
    } = config;
    const chartLocale = resolveChartLocale(renderLocale);
    const labels = WORD_CLOUD_LABELS[chartLocale];
    const valueFormatter = new Intl.NumberFormat(chartLocale, {
      maximumFractionDigits: 2,
    });
    const percentageFormatter = new Intl.NumberFormat(chartLocale, {
      style: 'percent',
      maximumFractionDigits: 2,
    });

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Assign a stable categorical color to each word while preserving custom palettes.
    const colors = getWordCloudPalette(style.palette, theme);
    const preparedData = prepareWordCloudData(data, colors);
    const layoutSeed = hashWordCloudData(preparedData);
    const rotationRandom = createSeededRandom(layoutSeed ^ 0x9e3779b9);

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      animate: false,
      type: 'wordCloud',
      data: preparedData,
      title: title ?? '',
      layout: {
        font: WORD_CLOUD_FONT_FAMILY,
        fontSize: [11, 44],
        fontWeight: (d: PreparedWordCloudDataItem) => d.fontWeight,
        padding: 2,
        random: createSeededRandom(layoutSeed),
        rotate: () =>
          WORD_CLOUD_ROTATIONS[Math.floor(rotationRandom() * WORD_CLOUD_ROTATIONS.length)],
      },
      encode: {
        text: 'text',
        color: 'text',
        value: 'value',
      },
      style: {
        fill: (d: PreparedWordCloudDataItem) => d.wordColor,
        fontFamily: WORD_CLOUD_FONT_FAMILY,
        fontWeight: (d: PreparedWordCloudDataItem & { weight?: number }) =>
          d.weight ?? d.fontWeight,
        stroke: (d: PreparedWordCloudDataItem) => d.wordColor,
      },
      scale: {
        color: { range: colors },
      },
      legend: false,
      state: {
        active: {
          fillOpacity: 1,
          strokeOpacity: 1,
        },
        inactive: {
          fillOpacity: 0.3,
          strokeOpacity: 0.3,
        },
      },
      tooltip: {
        title: 'text',
        items: [
          (d: PreparedWordCloudDataItem) => ({
            name: labels.weight,
            value: valueFormatter.format(d.value),
          }),
          (d: PreparedWordCloudDataItem) => ({
            name: labels.rank,
            value: `#${d.rank}`,
          }),
          (d: PreparedWordCloudDataItem) => ({
            name: labels.share,
            value: percentageFormatter.format(d.share),
          }),
        ],
      },
      interaction: {
        tooltip: true,
        elementHighlight: true,
        elementHoverScale: true,
      },
      viewStyle: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
      theme: getThemeObject(theme),
    };

    chart.options(chartOptions);
    chart.render();
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };

  return {
    render,
    destroy,
  };
};
