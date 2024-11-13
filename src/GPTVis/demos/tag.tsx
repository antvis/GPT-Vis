import { GPTVis, withDefaultChartCode } from '@antv/gpt-vis';
import React from 'react';

const components = {
  // Rewrite `a` style
  a(props: any) {
    const { href, children } = props;
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: '#2b8afe wavy underline' }}
      >
        {children}
      </a>
    );
  },
  // Rewrite `em`s (`*like so*`) to `i` with a color.
  em(props: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { node, ...rest } = props;
    return (
      <b
        style={{
          background: '#f0f489',
          fontWeight: 'bold',
        }}
        {...rest}
      />
    );
  },
  code: withDefaultChartCode(),
};

const content = `
# Haidilao's Food Delivery Revenue (2013-2022)

Here’s a visualization of [Haidilao](/)'s food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{
  "type": "line",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`
`;
export default () => <GPTVis components={components}>{content}</GPTVis>;
