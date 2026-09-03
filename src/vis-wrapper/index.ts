import { snapdom } from '@zumer/snapdom';
import type { VisualizationCodeVariant, VisualizationTheme } from '../types';
import {
  createCheckIcon,
  createCopyIcon,
  createDownloadIcon,
  createZoomInIcon,
  createZoomOutIcon,
} from './icons';
import { injectWrapperStyles } from './styles';

/**
 * Labels for different locales
 */
const DEFAULT_LABELS: Record<
  string,
  {
    chartTab: string;
    codeTab: string;
    download: string;
    copy: string;
    copied: string;
    theme: string;
    themeNames: Record<VisualizationTheme, string>;
  }
> = {
  'zh-CN': {
    chartTab: '图表',
    codeTab: '代码',
    download: '下载',
    copy: '复制',
    copied: '完成',
    theme: '主题',
    themeNames: {
      default: '默认',
      light: '浅色',
      dark: '深色',
      academy: '学院',
    },
  },
  'en-US': {
    chartTab: 'Chart',
    codeTab: 'Code',
    download: 'Download',
    copy: 'Copy',
    copied: 'Copied',
    theme: 'Theme',
    themeNames: {
      default: 'Default',
      light: 'Light',
      dark: 'Dark',
      academy: 'Academy',
    },
  },
};

/**
 * Wrapper configuration options
 */
export interface WrapperConfig {
  chartType?: string;
  syntax?: string | object;
  codeVariants?: VisualizationCodeVariant[];
  themeOptions?: VisualizationTheme[];
  activeTheme?: VisualizationTheme;
  onThemeChange?: (theme: VisualizationTheme) => void;
  locale?: string;
  onChartReady?: (chart: any) => void;
}

/**
 * Wrapper instance that provides control over the wrapper UI
 */
export interface WrapperInstance {
  chartContainer: HTMLElement;
  destroy: () => void;
  setChartRef: (chart: any) => void;
  update: (syntax: string | object, codeVariants?: VisualizationCodeVariant[]) => void;
}

/**
 * Create a wrapper container with tabs, buttons, and controls
 * @param container - The parent container element or selector
 * @param config - Wrapper configuration options
 * @returns A wrapper instance with the chart container and controls
 */
export function createVisWrapper(
  container: string | HTMLElement,
  config: WrapperConfig = {},
): WrapperInstance {
  // Inject styles if not already present
  injectWrapperStyles();

  // Get container element
  const containerElement =
    typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;

  if (!containerElement) {
    throw new Error('Container element not found');
  }

  const {
    chartType = '',
    syntax = '',
    codeVariants,
    themeOptions = [],
    activeTheme = 'default',
    onThemeChange,
    locale = 'zh-CN',
  } = config;
  const labels = DEFAULT_LABELS[locale] || DEFAULT_LABELS['en-US'];

  let chartRef: any = null;
  let copyTimeout: number | undefined;
  let isChartView = true;
  let activeCodeIndex = 0;
  let activeCode = '';
  let displayVariants: VisualizationCodeVariant[] = [];

  // Build zoom buttons HTML (initially hidden, shown when chart has zoomTo method)
  const zoomButtonsHTML = `
      <button class="gpt-vis-wrapper-text-button gpt-vis-wrapper-zoom-button gpt-vis-wrapper-tab-hide"
              data-action="zoom-out"
              aria-label="Zoom out"
              title="Zoom out">
        ${createZoomOutIcon(18)}
      </button>
      <button class="gpt-vis-wrapper-text-button gpt-vis-wrapper-zoom-button gpt-vis-wrapper-tab-hide"
              data-action="zoom-in"
              aria-label="Zoom in"
              title="Zoom in">
        ${createZoomInIcon(18)}
      </button>
      <div class="gpt-vis-wrapper-divider gpt-vis-wrapper-tab-hide"></div>
    `;
  const themeSwitcherHTML = themeOptions.length
    ? `
      <div class="gpt-vis-wrapper-theme-control"
           role="group"
           aria-label="${labels.theme}">
          ${themeOptions
            .map(
              (theme) =>
                `<button class="gpt-vis-wrapper-theme-button${theme === activeTheme ? ' active' : ''}"
                         type="button"
                         data-theme="${theme}"
                         aria-label="${labels.theme}: ${labels.themeNames[theme]}"
                         aria-pressed="${theme === activeTheme}"
                         title="${labels.themeNames[theme]}">
                   <span class="gpt-vis-wrapper-theme-swatch" aria-hidden="true"></span>
                   <span class="gpt-vis-wrapper-theme-label">${labels.themeNames[theme]}</span>
                 </button>`,
            )
            .join('')}
      </div>
    `
    : '';

  // Create wrapper HTML structure using template string
  const wrapperHTML = `
    <div class="gpt-vis-wrapper-container">
      <div class="gpt-vis-wrapper-header">
        <div class="gpt-vis-wrapper-tab-left">
          <button class="gpt-vis-wrapper-tab-button active"
                  type="button"
                  data-view="chart"
                  aria-pressed="true">
            ${labels.chartTab}
          </button>
          <div class="gpt-vis-wrapper-code-navigation"></div>
        </div>
        <div class="gpt-vis-wrapper-tab-right">
          ${themeSwitcherHTML}
          ${zoomButtonsHTML}
          <button class="gpt-vis-wrapper-text-button" 
                  data-action="download"
                  aria-label="${labels.download}">
            ${createDownloadIcon(16)} <span>${labels.download}</span>
          </button>
          <button class="gpt-vis-wrapper-text-button gpt-vis-wrapper-tab-hide" 
                  data-action="copy"
                  aria-label="${labels.copy}">
            ${createCopyIcon()} <span>${labels.copy}</span>
          </button>
        </div>
      </div>
      <div class="gpt-vis-wrapper-content">
        <div class="gpt-vis-wrapper-chart">
          <div class="gpt-vis-wrapper-chart-container"></div>
        </div>
        <div class="gpt-vis-wrapper-code gpt-vis-wrapper-tab-hide">
          <pre class="gpt-vis-wrapper-code-content"><code></code></pre>
        </div>
      </div>
    </div>
  `;

  // Insert HTML into container
  containerElement.innerHTML = wrapperHTML;

  // Get references to interactive elements
  const wrapperContainer = containerElement.querySelector('.gpt-vis-wrapper-container')!;
  const chartTabButton = wrapperContainer.querySelector('[data-view="chart"]') as HTMLButtonElement;
  const codeNavigation = wrapperContainer.querySelector(
    '.gpt-vis-wrapper-code-navigation',
  ) as HTMLElement;
  const chartWrapper = wrapperContainer.querySelector('.gpt-vis-wrapper-chart') as HTMLElement;
  const codeContainer = wrapperContainer.querySelector('.gpt-vis-wrapper-code') as HTMLElement;
  const codeContent = wrapperContainer.querySelector(
    '.gpt-vis-wrapper-code-content code',
  ) as HTMLElement;
  const chartContainer = wrapperContainer.querySelector(
    '.gpt-vis-wrapper-chart-container',
  ) as HTMLElement;
  const downloadButton = wrapperContainer.querySelector(
    '[data-action="download"]',
  ) as HTMLButtonElement;
  const copyButton = wrapperContainer.querySelector('[data-action="copy"]') as HTMLButtonElement;
  const themeControl = wrapperContainer.querySelector(
    '.gpt-vis-wrapper-theme-control',
  ) as HTMLElement | null;
  const themeButtons = wrapperContainer.querySelectorAll<HTMLButtonElement>('[data-theme]');
  const zoomInButton = wrapperContainer.querySelector(
    '[data-action="zoom-in"]',
  ) as HTMLButtonElement | null;
  const zoomOutButton = wrapperContainer.querySelector(
    '[data-action="zoom-out"]',
  ) as HTMLButtonElement | null;
  const divider = wrapperContainer.querySelector('.gpt-vis-wrapper-divider') as HTMLElement | null;

  const stringifyCode = (value: string | object): string =>
    typeof value === 'string' ? value : JSON.stringify(value, null, 2);

  const updateToolbarActions = () => {
    const hasZoomSupport = chartRef && typeof chartRef.zoomTo === 'function';
    downloadButton.classList.toggle('gpt-vis-wrapper-tab-hide', !isChartView);
    copyButton.classList.toggle('gpt-vis-wrapper-tab-hide', isChartView);
    themeControl?.classList.toggle('gpt-vis-wrapper-tab-hide', !isChartView);

    const hideZoom = !isChartView || !hasZoomSupport;
    zoomInButton?.classList.toggle('gpt-vis-wrapper-tab-hide', hideZoom);
    zoomOutButton?.classList.toggle('gpt-vis-wrapper-tab-hide', hideZoom);
    divider?.classList.toggle('gpt-vis-wrapper-tab-hide', hideZoom);
  };

  const updateNavigationState = () => {
    chartTabButton.classList.toggle('active', isChartView);
    chartTabButton.setAttribute('aria-pressed', String(isChartView));
    codeNavigation.querySelectorAll('button').forEach((button, index) => {
      const isActive = !isChartView && index === activeCodeIndex;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const showChart = () => {
    isChartView = true;
    chartWrapper.classList.remove('gpt-vis-wrapper-tab-hide');
    codeContainer.classList.add('gpt-vis-wrapper-tab-hide');
    updateNavigationState();
    updateToolbarActions();
  };

  const showCode = (index: number) => {
    const variant = displayVariants[index];
    if (!variant) return;
    isChartView = false;
    activeCodeIndex = index;
    activeCode = stringifyCode(variant.content);
    codeContent.textContent = activeCode;
    chartWrapper.classList.add('gpt-vis-wrapper-tab-hide');
    codeContainer.classList.remove('gpt-vis-wrapper-tab-hide');
    updateNavigationState();
    updateToolbarActions();
  };

  const renderCodeVariants = (
    currentSyntax: string | object,
    variants?: VisualizationCodeVariant[],
  ) => {
    displayVariants = variants?.length
      ? variants
      : [{ label: labels.codeTab, content: currentSyntax } satisfies VisualizationCodeVariant];
    activeCodeIndex = Math.min(activeCodeIndex, displayVariants.length - 1);
    codeNavigation.replaceChildren();

    displayVariants.forEach((variant, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gpt-vis-wrapper-tab-button';
      button.textContent = variant.label;
      button.setAttribute('aria-pressed', 'false');
      button.onclick = () => showCode(index);
      codeNavigation.appendChild(button);
    });

    activeCode = stringifyCode(displayVariants[activeCodeIndex].content);
    codeContent.textContent = activeCode;
    updateNavigationState();
  };

  renderCodeVariants(syntax, codeVariants);
  showChart();

  function handleZoomIn() {
    if (chartRef && typeof chartRef.zoomTo === 'function') {
      const currentZoom = chartRef.getZoom?.() || 1;
      const newZoom = Math.min(currentZoom * 1.15, 5); // Zoom in: multiply to enlarge
      chartRef.zoomTo(newZoom);
    }
  }

  function handleZoomOut() {
    if (chartRef && typeof chartRef.zoomTo === 'function') {
      const currentZoom = chartRef.getZoom?.() || 1;
      const newZoom = Math.max(currentZoom / 1.15, 0.1); // Zoom out: divide to shrink
      chartRef.zoomTo(newZoom);
    }
  }

  async function handleDownload() {
    try {
      if (chartContainer) {
        const result = await snapdom(chartContainer, { scale: 2 });
        await result.download({
          format: 'png',
          filename: `chart-${chartType}-${Date.now()}`,
        });
      }
    } catch (error) {
      console.error('Download image failed:', error);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(activeCode);
      copyButton.innerHTML = `${createCheckIcon()} <span>${labels.copied}</span>`;

      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }

      copyTimeout = window.setTimeout(() => {
        copyButton.innerHTML = `${createCopyIcon()} <span>${labels.copy}</span>`;
      }, 1000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }

  // Attach event listeners
  chartTabButton.onclick = showChart;
  downloadButton.onclick = handleDownload;
  copyButton.onclick = handleCopy;
  themeButtons.forEach((button) => {
    button.onclick = () => {
      themeButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      onThemeChange?.(button.dataset.theme as VisualizationTheme);
    };
  });
  if (zoomInButton) zoomInButton.onclick = handleZoomIn;
  if (zoomOutButton) zoomOutButton.onclick = handleZoomOut;

  // Return wrapper instance
  return {
    chartContainer,
    update: (newSyntax: string | object, newCodeVariants?: VisualizationCodeVariant[]) => {
      activeCodeIndex = 0;
      renderCodeVariants(newSyntax, newCodeVariants);
      if (!isChartView) showCode(0);
    },
    setChartRef: (chart: any) => {
      chartRef = chart;
      updateToolbarActions();
    },
    destroy: () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
      containerElement.innerHTML = '';
    },
  };
}
