import { snapdom } from '@zumer/snapdom';
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
  { chartTab: string; codeTab: string; download: string; copy: string; copied: string }
> = {
  'zh-CN': {
    chartTab: '图表',
    codeTab: '代码',
    download: '下载',
    copy: '复制',
    copied: '完成',
  },
  'en-US': {
    chartTab: 'Chart',
    codeTab: 'Code',
    download: 'Download',
    copy: 'Copy',
    copied: 'Copied',
  },
};

/**
 * G6 chart types that support zoom functionality
 */
const G6_CHART_TYPES = [
  'mind-map',
  'fishbone-diagram',
  'flow-diagram',
  'organization-chart',
  'network-graph',
  'indented-tree',
];

/**
 * Wrapper configuration options
 */
export interface WrapperConfig {
  chartType?: string;
  config?: any;
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

  const { chartType = '', config: chartConfig = {}, locale = 'zh-CN' } = config;
  const labels = DEFAULT_LABELS[locale] || DEFAULT_LABELS['en-US'];
  const isG6Chart = G6_CHART_TYPES.includes(chartType);

  let chartRef: any = null;
  let copyTimeout: number | undefined;

  // Build zoom buttons HTML for G6 charts
  const zoomButtonsHTML = isG6Chart
    ? `
      <button class="gpt-vis-wrapper-text-button gpt-vis-wrapper-zoom-button" 
              data-action="zoom-in" 
              aria-label="Zoom in" 
              title="Zoom in">
        ${createZoomInIcon(18)}
      </button>
      <button class="gpt-vis-wrapper-text-button gpt-vis-wrapper-zoom-button" 
              data-action="zoom-out" 
              aria-label="Zoom out" 
              title="Zoom out">
        ${createZoomOutIcon(18)}
      </button>
      <div class="gpt-vis-wrapper-divider"></div>
    `
    : '';

  // Create wrapper HTML structure using template string
  const wrapperHTML = `
    <div class="gpt-vis-wrapper-container">
      <div class="gpt-vis-wrapper-header">
        <div class="gpt-vis-wrapper-tab-left">
          <button class="gpt-vis-wrapper-tab-button active" 
                  data-tab="chart"
                  role="tab" 
                  aria-selected="true" 
                  aria-controls="chart-panel">
            ${labels.chartTab}
          </button>
          <button class="gpt-vis-wrapper-tab-button" 
                  data-tab="code"
                  role="tab" 
                  aria-selected="false" 
                  aria-controls="code-panel">
            ${labels.codeTab}
          </button>
        </div>
        <div class="gpt-vis-wrapper-tab-right">
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
        <div class="gpt-vis-wrapper-code gpt-vis-wrapper-tab-hide">${JSON.stringify(chartConfig, null, 2)}</div>
      </div>
    </div>
  `;

  // Insert HTML into container
  containerElement.innerHTML = wrapperHTML;

  // Get references to interactive elements
  const wrapperContainer = containerElement.querySelector('.gpt-vis-wrapper-container')!;
  const chartTabButton = wrapperContainer.querySelector('[data-tab="chart"]') as HTMLButtonElement;
  const codeTabButton = wrapperContainer.querySelector('[data-tab="code"]') as HTMLButtonElement;
  const chartWrapper = wrapperContainer.querySelector('.gpt-vis-wrapper-chart') as HTMLElement;
  const codeContainer = wrapperContainer.querySelector('.gpt-vis-wrapper-code') as HTMLElement;
  const chartContainer = wrapperContainer.querySelector(
    '.gpt-vis-wrapper-chart-container',
  ) as HTMLElement;
  const downloadButton = wrapperContainer.querySelector(
    '[data-action="download"]',
  ) as HTMLButtonElement;
  const copyButton = wrapperContainer.querySelector('[data-action="copy"]') as HTMLButtonElement;
  const zoomInButton = wrapperContainer.querySelector(
    '[data-action="zoom-in"]',
  ) as HTMLButtonElement | null;
  const zoomOutButton = wrapperContainer.querySelector(
    '[data-action="zoom-out"]',
  ) as HTMLButtonElement | null;
  const divider = wrapperContainer.querySelector('.gpt-vis-wrapper-divider') as HTMLElement | null;

  // Event handlers
  function switchTab(tab: 'chart' | 'code') {
    if (tab === 'chart') {
      chartTabButton.classList.add('active');
      chartTabButton.setAttribute('aria-selected', 'true');
      codeTabButton.classList.remove('active');
      codeTabButton.setAttribute('aria-selected', 'false');
      chartWrapper.classList.remove('gpt-vis-wrapper-tab-hide');
      codeContainer.classList.add('gpt-vis-wrapper-tab-hide');
      downloadButton.classList.remove('gpt-vis-wrapper-tab-hide');
      copyButton.classList.add('gpt-vis-wrapper-tab-hide');

      if (isG6Chart && zoomInButton && zoomOutButton && divider) {
        zoomInButton.classList.remove('gpt-vis-wrapper-tab-hide');
        zoomOutButton.classList.remove('gpt-vis-wrapper-tab-hide');
        divider.classList.remove('gpt-vis-wrapper-tab-hide');
      }
    } else {
      chartTabButton.classList.remove('active');
      chartTabButton.setAttribute('aria-selected', 'false');
      codeTabButton.classList.add('active');
      codeTabButton.setAttribute('aria-selected', 'true');
      chartWrapper.classList.add('gpt-vis-wrapper-tab-hide');
      codeContainer.classList.remove('gpt-vis-wrapper-tab-hide');
      downloadButton.classList.add('gpt-vis-wrapper-tab-hide');
      copyButton.classList.remove('gpt-vis-wrapper-tab-hide');

      if (isG6Chart && zoomInButton && zoomOutButton && divider) {
        zoomInButton.classList.add('gpt-vis-wrapper-tab-hide');
        zoomOutButton.classList.add('gpt-vis-wrapper-tab-hide');
        divider.classList.add('gpt-vis-wrapper-tab-hide');
      }
    }
  }

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
      await navigator.clipboard.writeText(JSON.stringify(chartConfig, null, 2));
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
  chartTabButton.onclick = () => switchTab('chart');
  codeTabButton.onclick = () => switchTab('code');
  downloadButton.onclick = handleDownload;
  copyButton.onclick = handleCopy;
  if (zoomInButton) zoomInButton.onclick = handleZoomIn;
  if (zoomOutButton) zoomOutButton.onclick = handleZoomOut;

  // Return wrapper instance
  return {
    chartContainer,
    setChartRef: (chart: any) => {
      chartRef = chart;
    },
    destroy: () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
      containerElement.innerHTML = '';
    },
  };
}
