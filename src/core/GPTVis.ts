import { Chart } from '@antv/g2';
import { isSyntaxFormat, parseSyntax } from './parser';
import { chartRenderers } from './renderers/g2-charts';

interface GPTVisOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
  withContainer?: boolean;
  engine?: any; // For future extensibility
}

interface ChartConfig {
  type: string;
  data?: any[];
  theme?: string;
  [key: string]: any;
}

/**
 * GPTVis - Framework-agnostic visualization library for AI
 * Supports both text-based syntax and JSON configuration
 */
export class GPTVis {
  private container: HTMLElement;
  private width: number;
  private height: number;
  private withContainer: boolean;
  private currentChart: Chart | null = null;
  private engine: any;

  constructor(options: GPTVisOptions) {
    const { container, width = 600, height = 400, withContainer = true, engine } = options;

    // Resolve container
    if (typeof container === 'string') {
      const el = document.querySelector(container);
      if (!el) {
        throw new Error(`Container not found: ${container}`);
      }
      this.container = el as HTMLElement;
    } else {
      this.container = container;
    }

    this.width = width;
    this.height = height;
    this.withContainer = withContainer;
    this.engine = engine;

    // Initialize container
    this.initContainer();
  }

  private initContainer() {
    if (this.withContainer) {
      this.container.style.width = `${this.width}px`;
      this.container.style.height = `${this.height}px`;
    }
  }

  /**
   * Render visualization from syntax or JSON
   */
  async render(input: string | ChartConfig): Promise<void> {
    let config: ChartConfig;

    if (typeof input === 'string') {
      // Check if it's syntax format or JSON
      if (isSyntaxFormat(input)) {
        config = parseSyntax(input) as ChartConfig;
      } else {
        // Try to parse as JSON
        try {
          config = JSON.parse(input);
        } catch {
          throw new Error('Invalid input format. Expected syntax or JSON.');
        }
      }
    } else {
      config = input;
    }

    // Clear previous chart
    if (this.currentChart) {
      this.currentChart.destroy();
      this.currentChart = null;
    }

    // Render based on type
    await this.renderChart(config);
  }

  private async renderChart(config: ChartConfig): Promise<void> {
    const { type, data = [], theme, ...rest } = config;

    // For now, we'll use G2 as the default engine
    // This can be extended to support other engines
    await this.renderWithG2(type, data, theme, rest);
  }

  private async renderWithG2(
    type: string,
    data: any[],
    theme?: string,
    options: any = {},
  ): Promise<void> {
    // Clear container
    this.container.innerHTML = '';

    // Create G2 chart
    const chart = new Chart({
      container: this.container,
      width: this.width,
      height: this.height,
      theme: theme as any,
    });

    // Get renderer for chart type
    const renderer = chartRenderers[type];
    if (!renderer) {
      throw new Error(
        `Unsupported chart type: ${type}. Supported types: ${Object.keys(chartRenderers).join(', ')}`,
      );
    }

    // Render chart
    renderer({ chart, data, options });

    await chart.render();
    this.currentChart = chart;
  }

  /**
   * Update data without recreating the chart
   */
  async update(newData: any[]): Promise<void> {
    if (this.currentChart) {
      this.currentChart.changeData(newData);
    }
  }

  /**
   * Destroy the chart and cleanup
   */
  destroy(): void {
    if (this.currentChart) {
      this.currentChart.destroy();
      this.currentChart = null;
    }
    this.container.innerHTML = '';
  }

  /**
   * Get the current chart instance
   */
  getChart(): Chart | null {
    return this.currentChart;
  }
}
