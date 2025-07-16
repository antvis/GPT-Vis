import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, ConfigProvider, GPTVisLite, PathMap, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
  overflow: 'auto',
};

const markdownContent = `
 ~~~vis-chart
  {
  "type": "path-map",
  "data": [
    {
      "path": {
        "points": [
          {
            "longitude": 120.130638,
            "latitude": 30.219835,
            "label": "石屋洞"
          },
          {
            "longitude": 120.128125,
            "latitude": 30.219386,
            "label": "满觉陇"
          },
          {
            "longitude": 120.118362,
            "latitude": 30.217175,
            "label": "杨梅岭"
          },
          {
            "longitude": 120.112958,
            "latitude": 30.207319,
            "label": "理安寺"
          },
          {
            "longitude": 120.11335,
            "latitude": 30.202395,
            "label": "九溪烟树"
          }
        ]
      },
      "markers": [
        {
          "longitude": 120.130638,
          "latitude": 30.219835,
          "label": "石屋洞"
        },
        {
          "longitude": 120.128125,
          "latitude": 30.219386,
          "label": "满觉陇"
        },
        {
          "longitude": 120.118362,
          "latitude": 30.217175,
          "label": "杨梅岭"
        },
        {
          "longitude": 120.112958,
          "latitude": 30.207319,
          "label": "理安寺"
        },
        {
          "longitude": 120.11335,
          "latitude": 30.202395,
          "label": "九溪烟树"
        }
      ]
    },
    {
      "path": {
        "points": [
          {
            "longitude": 120.100549,
            "latitude": 30.236875,
            "label": "飞来峰"
          },
          {
            "longitude": 120.101406,
            "latitude": 30.240826,
            "label": "灵隐寺"
          },
          {
            "longitude": 120.105337,
            "latitude": 30.236818,
            "label": "天竺三寺"
          }
        ]
      },
      "markers": [
        {
          "longitude": 120.100549,
          "latitude": 30.236875,
          "label": "飞来峰"
        },
        {
          "longitude": 120.101406,
          "latitude": 30.240826,
          "label": "灵隐寺"
        },
        {
          "longitude": 120.105337,
          "latitude": 30.236818,
          "label": "天竺三寺"
        }
      ]
    }
  ]
}
~~~`;

const CodeComponent = withChartCode({
  components: { [ChartType.PathMap]: PathMap },
  style: { width: 500 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => {
  return (
    <ConfigProvider
      map={{
        style: 'amap://styles/2acc71263b1344d93a902db8df1c8b68',
        token: '你的地图token',
      }}
    >
      <div style={bgStyle}>
        <Bubble
          placement="end"
          content="杭州赏桂最佳路线推荐"
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
