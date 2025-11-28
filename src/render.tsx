import React from 'react';
import ReactDOM from 'react-dom';

import { DEFAULT_CHART_COMPONENTS, type Spec } from './export';

const roots = new Map<HTMLElement, any>();

function getRoot(container: HTMLElement) {
  if (roots.has(container)) {
    return roots.get(container)!;
  }

  const root = (ReactDOM as any).createRoot(container);
  roots.set(container, root);
  return root;
}

export function render(container: string, spec: Spec) {
  const mount =
    typeof container === 'string'
      ? (document.querySelector(container) as HTMLElement)
      : (container as HTMLElement);
  if (!mount) throw new Error('Target container not found: ' + container);

  const { type, ...chartProps } = spec;
  const ChartComp = DEFAULT_CHART_COMPONENTS[type];

  if (!ChartComp) {
    throw new Error(`Unknown chart type: ${type}`);
  }

  const chartElement = React.createElement(ChartComp, chartProps);
  if ((ReactDOM as any).createRoot) {
    const root = getRoot(mount);
    root.render(chartElement);
  } else {
    ReactDOM.render(chartElement, mount);
  }
}
