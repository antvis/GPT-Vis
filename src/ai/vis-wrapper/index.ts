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

  // Create wrapper structure
  const wrapperContainer = document.createElement('div');
  wrapperContainer.className = 'gpt-vis-wrapper-container';

  // Header
  const header = document.createElement('div');
  header.className = 'gpt-vis-wrapper-header';

  // Tab left group (chart and code tabs)
  const tabLeftGroup = document.createElement('div');
  tabLeftGroup.className = 'gpt-vis-wrapper-tab-left';

  const chartTabButton = document.createElement('button');
  chartTabButton.className = 'gpt-vis-wrapper-tab-button active';
  chartTabButton.textContent = labels.chartTab;
  chartTabButton.setAttribute('role', 'tab');
  chartTabButton.setAttribute('aria-selected', 'true');
  chartTabButton.setAttribute('aria-controls', 'chart-panel');
  chartTabButton.onclick = () => switchTab('chart');

  const codeTabButton = document.createElement('button');
  codeTabButton.className = 'gpt-vis-wrapper-tab-button';
  codeTabButton.textContent = labels.codeTab;
  codeTabButton.setAttribute('role', 'tab');
  codeTabButton.setAttribute('aria-selected', 'false');
  codeTabButton.setAttribute('aria-controls', 'code-panel');
  codeTabButton.onclick = () => switchTab('code');

  tabLeftGroup.appendChild(chartTabButton);
  tabLeftGroup.appendChild(codeTabButton);

  // Tab right group (action buttons)
  const tabRightGroup = document.createElement('div');
  tabRightGroup.className = 'gpt-vis-wrapper-tab-right';

  // Zoom buttons for G6 charts
  let zoomInButton: HTMLButtonElement | null = null;
  let zoomOutButton: HTMLButtonElement | null = null;
  let divider: HTMLDivElement | null = null;

  if (isG6Chart) {
    zoomInButton = document.createElement('button');
    zoomInButton.className = 'gpt-vis-wrapper-text-button gpt-vis-wrapper-zoom-button';
    zoomInButton.innerHTML = createZoomInIcon(18);
    zoomInButton.setAttribute('aria-label', 'Zoom in');
    zoomInButton.setAttribute('title', 'Zoom in');
    zoomInButton.onclick = handleZoomIn;

    zoomOutButton = document.createElement('button');
    zoomOutButton.className = 'gpt-vis-wrapper-text-button gpt-vis-wrapper-zoom-button';
    zoomOutButton.innerHTML = createZoomOutIcon(18);
    zoomOutButton.setAttribute('aria-label', 'Zoom out');
    zoomOutButton.setAttribute('title', 'Zoom out');
    zoomOutButton.onclick = handleZoomOut;

    divider = document.createElement('div');
    divider.className = 'gpt-vis-wrapper-divider';

    tabRightGroup.appendChild(zoomInButton);
    tabRightGroup.appendChild(zoomOutButton);
    tabRightGroup.appendChild(divider);
  }

  // Download button
  const downloadButton = document.createElement('button');
  downloadButton.className = 'gpt-vis-wrapper-text-button';
  downloadButton.innerHTML = `${createDownloadIcon(16)} <span>${labels.download}</span>`;
  downloadButton.setAttribute('aria-label', labels.download);
  downloadButton.onclick = handleDownload;

  // Copy button
  const copyButton = document.createElement('button');
  copyButton.className = 'gpt-vis-wrapper-text-button gpt-vis-wrapper-tab-hide';
  copyButton.innerHTML = `${createCopyIcon()} <span>${labels.copy}</span>`;
  copyButton.setAttribute('aria-label', labels.copy);
  copyButton.onclick = handleCopy;

  tabRightGroup.appendChild(downloadButton);
  tabRightGroup.appendChild(copyButton);

  header.appendChild(tabLeftGroup);
  header.appendChild(tabRightGroup);

  // Content area
  const content = document.createElement('div');
  content.className = 'gpt-vis-wrapper-content';

  // Chart container
  const chartWrapper = document.createElement('div');
  chartWrapper.className = 'gpt-vis-wrapper-chart';

  const chartContainer = document.createElement('div');
  chartContainer.className = 'gpt-vis-wrapper-chart-container';
  chartWrapper.appendChild(chartContainer);

  // Code container
  const codeContainer = document.createElement('div');
  codeContainer.className = 'gpt-vis-wrapper-code gpt-vis-wrapper-tab-hide';
  codeContainer.textContent = JSON.stringify(chartConfig, null, 2);

  content.appendChild(chartWrapper);
  content.appendChild(codeContainer);

  wrapperContainer.appendChild(header);
  wrapperContainer.appendChild(content);

  containerElement.appendChild(wrapperContainer);

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
      containerElement.removeChild(wrapperContainer);
    },
  };
}
