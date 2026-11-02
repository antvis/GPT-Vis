'use client';

import { LiveChart } from '../../components/LiveChart';
import { DEFAULT_THEME } from '../../themes/presets';

const examples = [
  {
    name: 'Line',
    type: 'line',
    input: {
      type: 'line',
      title: 'Revenue',
      axisXTitle: false,
      axisYTitle: false,
      data: [
        { time: 'Q1', value: 32 },
        { time: 'Q2', value: 48 },
        { time: 'Q3', value: 42 },
        { time: 'Q4', value: 65 },
      ],
    },
  },
  {
    name: 'Network graph',
    type: 'network-graph',
    input: {
      type: 'network-graph',
      title: 'Teams',
      layout: 'circular',
      data: {
        nodes: [{ name: 'Design' }, { name: 'Product' }, { name: 'Research' }],
        edges: [
          { source: 'Design', target: 'Product' },
          { source: 'Product', target: 'Research' },
          { source: 'Research', target: 'Design' },
        ],
      },
    },
  },
  {
    name: 'Table',
    type: 'table',
    input: {
      type: 'table',
      title: 'Revenue',
      data: [
        { Quarter: 'Q3', USD: 42 },
        { Quarter: 'Q4', USD: 65 },
      ],
    },
  },
];
export function ThemeExamplesPreview() {
  const theme = DEFAULT_THEME;
  return (
    <figure className="docs-theme-demo">
      <div className="docs-theme-demo-heading">
        <span className="home-swatches" aria-hidden="true">
          {theme.tokens?.category10?.slice(0, 3).map((color) => (
            <i key={color} style={{ background: color }} />
          ))}
        </span>
        <strong>{theme.label}</strong>
        <span>Shared theme · three chart types</span>
      </div>
      <div className="docs-theme-demo-grid">
        {examples.map((example) => (
          <div
            key={example.type}
            style={{ background: theme.style?.backgroundColor ?? theme.tokens?.colorBackground }}
          >
            <LiveChart
              input={example.input}
              theme={theme}
              height={250}
              label={`${example.name} using ${theme.label}`}
            />
            <span
              className="docs-theme-demo-label"
              style={{ color: theme.tokens?.colorTextSecondary }}
            >
              {example.name}
            </span>
          </div>
        ))}
      </div>
      <figcaption>
        These charts use the same theme configuration. Try other styles and create your own in Theme
        Studio.
      </figcaption>
    </figure>
  );
}
