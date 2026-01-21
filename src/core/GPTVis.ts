import { Chart } from '@antv/g2';
import { isSyntaxFormat, parseSyntax } from './parser';

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

    // Map chart type to G2 mark
    switch (type) {
      case 'pie':
        this.renderPie(chart, data, options);
        break;
      case 'line':
        this.renderLine(chart, data, options);
        break;
      case 'bar':
        this.renderBar(chart, data, options);
        break;
      case 'column':
        this.renderColumn(chart, data, options);
        break;
      case 'area':
        this.renderArea(chart, data, options);
        break;
      // Add more chart types here
      default:
        throw new Error(`Unsupported chart type: ${type}`);
    }

    await chart.render();
    this.currentChart = chart;
  }

  private renderPie(chart: Chart, data: any[], options: any) {
    const { innerRadius = 0 } = options;

    chart
      .coordinate({ type: 'theta', innerRadius })
      .data(data)
      .interval()
      .encode('y', 'value')
      .encode('color', 'category')
      .legend('color', { position: 'top' })
      .label({
        text: (d: any) => `${d.category}: ${d.value}`,
        position: 'outside',
      });
  }

  private renderLine(chart: Chart, data: any[], options: any) {
    const { xField = 'x', yField = 'y', seriesField } = options;

    const mark = chart.data(data).line().encode('x', xField).encode('y', yField);

    if (seriesField) {
      mark.encode('color', seriesField).legend('color', { position: 'top' });
    }

    mark.label({
      text: yField,
      style: {
        textAlign: 'center',
      },
    });
  }

  private renderBar(chart: Chart, data: any[], options: any) {
    const { xField = 'x', yField = 'y', seriesField } = options;

    const mark = chart
      .coordinate({ transform: [{ type: 'transpose' }] })
      .data(data)
      .interval()
      .encode('x', xField)
      .encode('y', yField);

    if (seriesField) {
      mark.encode('color', seriesField).legend('color', { position: 'top' });
    }
  }

  private renderColumn(chart: Chart, data: any[], options: any) {
    const { xField = 'x', yField = 'y', seriesField } = options;

    const mark = chart.data(data).interval().encode('x', xField).encode('y', yField);

    if (seriesField) {
      mark.encode('color', seriesField).legend('color', { position: 'top' });
    }
  }

  private renderArea(chart: Chart, data: any[], options: any) {
    const { xField = 'x', yField = 'y', seriesField } = options;

    const mark = chart.data(data).area().encode('x', xField).encode('y', yField);

    if (seriesField) {
      mark.encode('color', seriesField).legend('color', { position: 'top' });
    }
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
