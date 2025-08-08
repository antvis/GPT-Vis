---
title: Customize Chart Styles
nav: { title: 'Guide', order: 0 }
toc: content
order: 3
---

# Customize Chart Styles

Configure global styles for chart components by passing style properties to the [ConfigProvider](/components/config-provider).

## Customize Component-Level Styles

Customize styles for each component

```tsx | pure
import { ConfigProvider } from '@antv/gpt-vis';

// Set donut chart style
const pieConfig = {
  legend: false,
  innerRadius: 0.6,
  style: {
    stroke: '#fff',
    inset: 1,
    radius: 10,
  },
};

// Set gradient color for area chart
const areaConfig = {
  style: {
    fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
  },
  line: {
    style: {
      stroke: 'darkgreen',
      strokeWidth: 2,
    },
    tooltip: false,
  },
};

// Set icon for map
const pinMapConfig = {
  markerStyle: {
    iconPath:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JZf9T6psSzkAAAAAAAAAAAAADmJ7AQ/original',
  },
};

export default () => {
  return (
    <ConfigProvider
      components={{
        Pie: pieConfig,
        Area: areaConfig,
        PinMap: pinMapConfig,
      }}
    >
      // ...
    </ConfigProvider>
  );
};
```

```tsx
import { Bubble, type BubbleProps } from '@ant-design/x';
import { ConfigProvider, GPTVis } from '@antv/gpt-vis';

// Set donut chart style
const pieConfig = {
  legend: false,
  innerRadius: 0.6,
  style: {
    stroke: '#fff',
    inset: 1,
    radius: 10,
  },
};

// Set gradient color for area chart
const areaConfig = {
  style: {
    fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
  },
  line: {
    style: {
      stroke: 'darkgreen',
      strokeWidth: 2,
    },
    tooltip: false,
  },
};

// Set icon for map
const pinMapConfig = {
  markerStyle: {
    iconPath:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JZf9T6psSzkAAAAAAAAAAAAADmJ7AQ/original',
  },
};

const markdownContent = `
\`\`\`vis-chart
{
  "type": "area",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "Category One", "value": 27 },
    { "category": "Category Two", "value": 25 },
    { "category": "Category Three", "value": 18 },
    { "category": "Category Four", "value": 15 },
    { "category": "Category Five", "value": 10 },
    { "category": "Other", "value": 5 }
  ]
}
\`\`\`

\`\`\`vis-chart
  {
   "type": "pin-map",
   "data": [
    { "label": "Yangmeiling", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "Liansi Temple", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "Jiuxi Yanshu", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "Feilai Peak", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "Lingyin Temple", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "Tianzhu Three Temples", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "Hangzhou Botanical Garden", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "Hangzhou Flower Nursery", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "Su Causeway", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "Hupao Park", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "Yu Huang Feiyun", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "Changqiao Park", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\`\`\`
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
  overflow: 'auto',
};

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <ConfigProvider
      components={{
        Pie: pieConfig,
        Area: areaConfig,
        PinMap: pinMapConfig,
      }}
    >
      <div style={bgStyle}>
        <Bubble
          content={markdownContent}
          messageRender={RenderMarkdown}
          avatar={{
            src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
          }}
          variant="shadow"
          styles={{ content: { background: '#fff' } }}
        />
      </div>
    </ConfigProvider>
  );
};
```

## Customize chart-level themes

```tsx | pure
import { ConfigProvider } from '@antv/gpt-vis';

export default () => {
  return (
    <ConfigProvider
      plot={{ theme: { type: 'academy' } }}
      map={{ style: 'dark', token: 'your map token' }}
    >
      // ...
    </ConfigProvider>
  );
};
```

```tsx
import { Bubble, type BubbleProps } from '@ant-design/x';
import { ConfigProvider, GPTVis } from '@antv/gpt-vis';

const markdownContent = `
\`\`\`vis-chart
{
  "type": "area",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "Category One", "value": 27 },
    { "category": "Category Two", "value": 25 },
    { "category": "Category Three", "value": 18 },
    { "category": "Category Four", "value": 15 },
    { "category": "Category Five", "value": 10 },
    { "category": "Other", "value": 5 }
  ]
}
\`\`\`

\`\`\`vis-chart
  {
   "type": "pin-map",
   "data": [
    { "label": "Yangmeiling", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "Liansi Temple", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "Jiuxi Yanshu", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "Feilai Peak", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "Lingyin Temple", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "Tianzhu Three Temples", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "Hangzhou Botanical Garden", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "Hangzhou Flower Nursery", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "Su Causeway", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "Hupao Park", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "Yu Huang Feiyun", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "Changqiao Park", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\`\`\`
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
  overflow: 'auto',
};

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <ConfigProvider
      plot={{ theme: { type: 'academy' } }}
      map={{ style: 'dark', token: '你的地图token' }}
    >
      <div style={bgStyle}>
        <Bubble
          content={markdownContent}
          messageRender={RenderMarkdown}
          avatar={{
            src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
          }}
          variant="shadow"
          styles={{ content: { background: '#fff' } }}
        />
      </div>
    </ConfigProvider>
  );
};
```

More usage details can be found in [ConfigProvider](/components/config-provider)
