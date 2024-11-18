import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, ConfigProvider, GPTVisLite, PinMap, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

const markdownContent = `
 ~~~vis-chart
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
~~~`;

const CodeComponent = withChartCode({
  components: { [ChartType.PinMap]: PinMap },
  debug: true,
  style: { width: 500 },
});

export default () => {
  return (
    <ConfigProvider
      map={{
        style: 'amap://styles/2acc71263b1344d93a902db8df1c8b68',
        token: '你的地图token',
      }}
      components={{
        PinMap: {
          markerStyle: {
            iconPath:
              'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JZf9T6psSzkAAAAAAAAAAAAADmJ7AQ/original',
          },
        },
      }}
    >
      <div style={bgStyle}>
        <Bubble
          placement="end"
          content="杭州可以看桂花的地方"
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
    </ConfigProvider>
  );
};
