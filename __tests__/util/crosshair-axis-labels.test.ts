import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  class Label {
    bounds = { min: [40, 40], max: [80, 60] };
    translate = vi.fn();

    getBounds() {
      return this.bounds;
    }
  }

  return {
    Label,
    crosshairs: [] as Array<{
      pointer?: [number, number];
      style: Record<string, unknown>;
      text?: string;
      label: Label;
    }>,
    tags: [] as Array<
      Label & {
        pointer?: [number, number];
        style: Record<string, unknown>;
        text?: string;
      }
    >,
    plot: undefined as unknown,
  };
});

vi.mock('@antv/component', () => ({
  LineCrosshair: class {
    label = new mocks.Label();

    querySelector() {
      return this.label;
    }

    pointer?: [number, number];
    style: Record<string, unknown>;
    text?: string;

    constructor(options: { style: Record<string, unknown> }) {
      this.style = { ...options.style };
      mocks.crosshairs.push(this);
    }

    setText(text: string) {
      this.text = text;
    }

    setPointer(pointer: [number, number]) {
      this.pointer = pointer;
    }

    destroy() {}
  },
  Tag: class extends mocks.Label {
    pointer?: [number, number];
    style: Record<string, unknown>;
    text?: string;

    constructor(options: { style: Record<string, unknown> }) {
      super();
      this.style = { ...options.style };
      this.text = options.style.text as string | undefined;
      mocks.tags.push(this);
    }

    update(options: { text: string }) {
      this.text = options.text;
    }

    setLocalPosition(pointer: [number, number]) {
      this.pointer = pointer;
    }

    destroy() {}
  },
}));

vi.mock('@antv/g2', () => ({
  selectPlotArea: () => mocks.plot,
}));

import { bindCrosshairAxisLabels } from '../../src/util/crosshair-axis-labels';

describe('crosshair axis labels', () => {
  beforeEach(() => {
    mocks.crosshairs.length = 0;
    mocks.tags.length = 0;
  });

  it('removes floating-point noise from an interpolated numeric label', () => {
    const handlers: Record<string, (event: unknown) => void> = {};
    mocks.plot = {
      getLocalPosition: () => [0, 0],
      parentNode: { appendChild: () => undefined },
      ruleX: { style: { x1: 0, x2: 100, y1: 50, y2: 50 } },
      ruleY: { style: { x1: 50, x2: 50, y1: 0, y2: 100 } },
    };

    const chart = {
      getContext: () => ({
        canvas: { getRoot: () => ({}), getConfig: () => ({ width: 200, height: 140 }) },
        views: [
          {
            coordinate: { invert: (point: [number, number]) => point },
            scale: {
              x: {
                getFormatter: () => (value: unknown) => value,
                invert: () => 2020,
              },
              y: {
                getFormatter: () => (value: unknown) => value,
                getTicks: () => [0.8, 0.9, 1, 1.1],
                invert: () => 0.9500000000000001,
              },
            },
          },
        ],
      }),
      off: () => undefined,
      on: (name: string, handler: (event: unknown) => void) => {
        handlers[name] = handler;
      },
    };

    bindCrosshairAxisLabels(chart as never, 'default');
    handlers['plot:pointermove']({ offsetY: 50 });

    expect(mocks.crosshairs[1].text).toBe('0.95');
  });

  it('uses the requested line scale and places its label on the right axis', () => {
    const handlers: Record<string, (event: unknown) => void> = {};
    mocks.plot = {
      getLocalPosition: () => [20, 0],
      parentNode: { appendChild: () => undefined },
      ruleX: { style: { x1: 0, x2: 100, y1: 50, y2: 50 } },
      ruleY: { style: { x1: 50, x2: 50, y1: 0, y2: 100 } },
    };

    const chart = {
      getContext: () => ({
        canvas: { getRoot: () => ({}), getConfig: () => ({ width: 200, height: 140 }) },
        views: [
          {
            coordinate: { invert: (point: [number, number]) => point },
            components: [
              {
                bbox: { height: 100, width: 45, x: 175, y: 0 },
                position: 'right',
                scales: [{ field: 'value_2' }],
                type: 'axisY',
              },
            ],
            scale: {
              x: {
                getFormatter: () => (value: unknown) => value,
                invert: () => 'May',
              },
              y: {
                getOptions: () => ({ field: 'value_1' }),
                getTicks: () => [0, 1000, 2000],
                invert: () => 1350,
              },
              y1: {
                getFormatter: () => (value: unknown) => `${value}%`,
                getOptions: () => ({ field: 'value_2' }),
                getTicks: () => [0, 10, 20],
                invert: () => 14,
              },
            },
          },
        ],
      }),
      off: () => undefined,
      on: (name: string, handler: (event: unknown) => void) => {
        handlers[name] = handler;
      },
    };

    bindCrosshairAxisLabels(chart as never, 'default', {
      useStandaloneYLabel: true,
      yAxisPosition: 'right',
      yField: 'value_2',
    });
    handlers['plot:pointermove']({ offsetY: 50 });

    expect(mocks.crosshairs).toHaveLength(1);
    expect(mocks.tags[0].text).toBe('14%');
    expect(mocks.tags[0].pointer).toEqual([175, 50]);
  });

  it('can render an additional right-axis label without duplicating the x-axis label', () => {
    const handlers: Record<string, (event: unknown) => void> = {};
    mocks.plot = {
      getLocalPosition: () => [0, 0],
      parentNode: { appendChild: () => undefined },
      ruleX: { style: { x1: 0, x2: 100, y1: 50, y2: 50 } },
      ruleY: { style: { x1: 50, x2: 50, y1: 0, y2: 100 } },
    };

    const chart = {
      getContext: () => ({
        canvas: { getRoot: () => ({}), getConfig: () => ({ width: 200, height: 140 }) },
        views: [
          {
            coordinate: { invert: (point: [number, number]) => point },
            scale: {
              x: {
                getFormatter: () => (value: unknown) => value,
                invert: () => 'May',
              },
              y: {
                getOptions: () => ({ field: 'value_3' }),
                getFormatter: () => (value: unknown) => `${value}%`,
                getTicks: () => [0, 50, 100],
                invert: () => 68,
              },
            },
          },
        ],
      }),
      off: () => undefined,
      on: (name: string, handler: (event: unknown) => void) => {
        handlers[name] = handler;
      },
    };

    bindCrosshairAxisLabels(chart as never, 'default', {
      showXLabel: false,
      yAxisPosition: 'right',
      yField: 'value_3',
    });
    handlers['plot:pointermove']({ offsetY: 50 });

    expect(mocks.crosshairs).toHaveLength(0);
    expect(mocks.tags).toHaveLength(1);
    expect(mocks.tags[0].text).toBe('68%');
    expect(mocks.tags[0].pointer).toEqual([100, 50]);
  });

  it.each([false, true])('keeps axis tags inside the canvas (standalone Y: %s)', (standalone) => {
    const handlers: Record<string, (event: unknown) => void> = {};
    const canvasSize = { width: 200, height: 140 };
    const plot = {
      getLocalPosition: () => [20, 10],
      parentNode: { appendChild: () => undefined },
      ruleX: { style: { x1: 0, x2: 160, y1: 50, y2: 50 } },
      ruleY: { style: { x1: 5, x2: 5, y1: 0, y2: 100 } },
    };
    mocks.plot = plot;
    const chart = {
      getContext: () => ({
        canvas: { getRoot: () => ({}), getConfig: () => canvasSize },
        views: [
          {
            coordinate: { invert: (point: [number, number]) => point },
            scale: {
              x: { invert: () => 'A long category name' },
              y: { invert: () => 12345.67 },
            },
          },
        ],
      }),
      on: (name: string, handler: (event: unknown) => void) => {
        handlers[name] = handler;
      },
    };
    bindCrosshairAxisLabels(chart as never, 'default', {
      useStandaloneYLabel: standalone,
      yAxisPosition: standalone ? 'right' : 'left',
    });
    handlers['plot:pointermove']({ offsetY: 12 });
    const xTag = mocks.crosshairs[0].label;
    const yTag = standalone ? mocks.tags[0] : mocks.crosshairs[1].label;

    // Bounds include the label background and padding, in canvas coordinates.
    xTag.bounds = { min: [-30, 120], max: [80, 148] };
    yTag.bounds = standalone
      ? { min: [175, -8], max: [245, 20] }
      : { min: [-60, -8], max: [10, 20] };
    handlers['plot:pointermove']({ offsetY: 12 });
    expect(xTag.translate).toHaveBeenLastCalledWith(34, -12);
    expect(yTag.translate).toHaveBeenLastCalledWith(standalone ? -49 : 64, 12);
    expect(plot.ruleY.style.x1).toBe(5);
    expect(plot.ruleX.style.y1).toBe(2);
    expect(mocks.crosshairs[0].text).toBe('A long category name');
    expect(standalone ? mocks.tags[0].text : mocks.crosshairs[1].text).toBe('12345.67');

    // Recheck against the current canvas size after a resize.
    canvasSize.width = 160;
    xTag.bounds = { min: [100, 100], max: [190, 128] };
    handlers['plot:pointermove']({ offsetY: 12 });
    expect(xTag.translate).toHaveBeenLastCalledWith(-34, 0);

    xTag.translate.mockClear();
    xTag.bounds = { min: [40, 100], max: [130, 128] };
    handlers['plot:pointermove']({ offsetY: 12 });
    expect(xTag.translate).not.toHaveBeenCalled();
  });
});
