---
order: 3
group:
  order: 2
  title: 地图
toc: content
---

# HeatMap 热力地图

热力地图，直观展示数据密度与频率的空间分布。

## 代码演示

### 单独使用

```jsx
import React from 'react';
import { HeatMap } from '@antv/gpt-vis';

const data = [
  {
    longitude: 121.473117,
    latitude: 31.230125,
    value: 20,
  },
  {
    longitude: 121.473337,
    latitude: 31.230325,
    value: 100,
  },
  {
    longitude: 121.473557,
    latitude: 31.230525,
    value: 300,
  },
  {
    longitude: 121.473777,
    latitude: 31.230725,
    value: 600,
  },
  {
    longitude: 121.473997,
    latitude: 31.230925,
    value: 1000,
  },
];

export default () => <HeatMap data={data} />;
```

### 使用 Markdown 协议

```tsx
import { Bubble, type BubbleProps } from '@ant-design/x';
import { HeatMap, withChartCode, ChartType, GPTVisLite } from '@antv/gpt-vis';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const markdownContent = `
 ~~~vis-chart
  {
    "type": "heat-map",
    "data": [
      {
        "longitude": 121.474856,
        "latitude": 31.249162,
        "value": 800
      },
      {
        "longitude": 121.499718,
        "latitude": 31.239703,
        "value": 1000
      },
      {
        "longitude": 121.48612,
        "latitude": 31.24166,
        "value": 1200
      },
      {
        "longitude": 121.449895,
        "latitude": 31.228609,
        "value": 500
      },
      {
        "longitude": 121.449486,
        "latitude": 31.222042,
        "value": 900
      },
      {
        "longitude": 121.431826,
        "latitude": 31.204638,
        "value": 400
      },
      {
        "longitude": 121.438573,
        "latitude": 31.204188,
        "value": 1000
      },
      {
        "longitude": 121.448453,
        "latitude": 31.222341,
        "value": 300
      },
      {
        "longitude": 121.474856,
        "latitude": 31.249162,
        "value": 800
      },
      {
        "longitude": 121.473688,
        "latitude": 31.249921,
        "value": 1000
      },
      {
        "longitude": 121.449895,
        "latitude": 31.228609,
        "value": 500
      },
      {
        "longitude": 121.449486,
        "latitude": 31.222042,
        "value": 900
      },
      {
        "longitude": 121.431826,
        "latitude": 31.204638,
        "value": 400
      },
      {
        "longitude": 121.438573,
        "latitude": 31.204188,
        "value": 1000
      },
      {
        "longitude": 121.448453,
        "latitude": 31.222341,
        "value": 300
      },
      {
        "longitude": 121.448997,
        "latitude": 31.203590,
        "value": 400
      }
    ]
  }
~~~`;

const CodeComponent = withChartCode({
  components: { [ChartType.HeatMap]: HeatMap },
  style: { width: 500 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble
        placement="end"
        content="上海市游客量较大的景点在哪里？"
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp',
        }}
        styles={{ content: { background: '#ebebeb' } }}
      />
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
  );
};
```

## Spec

```json
{
  "type": "heat-map",
  "data": [
    {
      "longitude": 121.473117,
      "latitude": 31.230125,
      "value": 20
    },
    {
      "longitude": 121.473337,
      "latitude": 31.230325,
      "value": 100
    },
    {
      "longitude": 121.473557,
      "latitude": 31.230525,
      "value": 300
    },
    {
      "longitude": 121.473777,
      "latitude": 31.230725,
      "value": 600
    },
    {
      "longitude": 121.473997,
      "latitude": 31.230925,
      "value": 1000
    }
  ]
}
```

## API

### HeatMapProps

| 属性 | 类型              | 是否必传 | 默认值 | 说明 |
| ---- | ----------------- | -------- | ------ | ---- |
| data | HeatMapDataItem[] | 是       | -      | 数据 |

### HeatMapDataItem

| 属性      | 类型   | 是否必传 | 默认值 | 说明   |
| --------- | ------ | -------- | ------ | ------ |
| longitude | number | 是       | -      | 经度   |
| latitude  | number | 是       | -      | 纬度   |
| value     | number | 是       | -      | 热力值 |
