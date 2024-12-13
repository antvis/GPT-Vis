---
title: 定制图表样式
nav: { title: '指南', order: 0 }
toc: content
order: 3
---

# 定制图表样式

通过在 [ConfigProvider](/components/config-provider) 中传入样式属性，来配置图表组件的全局样式。

## 定制组件级样式

给各个组件定制样式

```tsx | pure
import { ConfigProvider } from '@antv/gpt-vis';

// 设置甜甜圈样式
const pieConfig = {
  legend: false,
  innerRadius: 0.6,
  style: {
    stroke: '#fff',
    inset: 1,
    radius: 10,
  },
};

// 面积图设置渐变色
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

// 地图设置图标
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

// 设置甜甜圈样式
const pieConfig = {
  legend: false,
  innerRadius: 0.6,
  style: {
    stroke: '#fff',
    inset: 1,
    radius: 10,
  },
};

// 面积图设置渐变色
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

// 地图设置图标
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
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "分类四", "value": 15 },
    { "category": "分类五", "value": 10 },
    { "category": "其他", "value": 5 }
  ]
}
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

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
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

## 定制图表级主题

```tsx | pure
import { ConfigProvider } from '@antv/gpt-vis';

export default () => {
  return (
    <ConfigProvider
      plot={{ theme: { type: 'academy' } }}
      map={{ style: 'dark', token: '你的地图token' }}
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
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "分类四", "value": 15 },
    { "category": "分类五", "value": 10 },
    { "category": "其他", "value": 5 }
  ]
}
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

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
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

更多用法详见 [ConfigProvider](/components/config-provider)
