import type { CodeBlockComponent } from '@antv/gpt-vis';
import { ChartType, GPTVis, PinMap, withChartCode } from '@antv/gpt-vis';
import React from 'react';

/**
 * 自定义代码块渲染器
 */
const MyUIRenderer: CodeBlockComponent = ({ children }) => {
  return <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>{children}</div>;
};

const components = {
  code: withChartCode({
    languageRenderers: { kotlin: MyUIRenderer },
    components: { [ChartType.PinMap]: PinMap },
  }),
};

const content = `
\`\`\`my-ui
my data ...
\`\`\`

\`\`\`vis-chart
{
   "type": "pin-map",
   "data": [
    { "label": "杨梅岭", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "理安寺", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "九溪烟树", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "飞来峰", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "灵隐寺", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "天竺三寺", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "杭州植物园", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "杭州花圃", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "苏堤", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "虎跑公园", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "玉皇飞云", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "长桥公园", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\`\`\`
`;
export default () => <GPTVis components={components}>{content}</GPTVis>;
