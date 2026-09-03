import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  crosshairs: [] as Array<{
    pointer?: [number, number];
    style: Record<string, unknown>;
    text?: string;
  }>,
  plot: undefined as unknown,
}));

vi.mock('@antv/component', () => ({
  LineCrosshair: class {
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
}));

vi.mock('@antv/g2', () => ({
  selectPlotArea: () => mocks.plot,
}));

import { bindCrosshairAxisLabels } from '../src/util/crosshair-axis-labels';

describe('crosshair axis labels', () => {
  beforeEach(() => {
    mocks.crosshairs.length = 0;
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
        canvas: { getRoot: () => ({}) },
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
      getLocalPosition: () => [0, 0],
      parentNode: { appendChild: () => undefined },
      ruleX: { style: { x1: 0, x2: 100, y1: 50, y2: 50 } },
      ruleY: { style: { x1: 50, x2: 50, y1: 0, y2: 100 } },
    };

    const chart = {
      getContext: () => ({
        canvas: { getRoot: () => ({}) },
        views: [
          {
            coordinate: { invert: (point: [number, number]) => point },
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
      yAxisPosition: 'right',
      yField: 'value_2',
    });
    handlers['plot:pointermove']({ offsetY: 50 });

    expect(mocks.crosshairs[1].text).toBe('14%');
    expect(mocks.crosshairs[1].style.tagPosition).toBe('end');
    expect(mocks.crosshairs[1].pointer).toEqual([100, 50]);
  });
});
