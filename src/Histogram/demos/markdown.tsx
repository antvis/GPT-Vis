import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVis, Histogram, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个直方图

\`\`\`vis-chart
{
    "type": "histogram",
    "data": [
        {
            "value": 45
        },
        {
            "value": 55
        },
        {
            "value": 67
        },
        {
            "value": 50
        },
        {
            "value": 42
        },
        {
            "value": 61
        },
        {
            "value": 33
        },
        {
            "value": 76
        },
        {
            "value": 59
        },
        {
            "value": 51
        },
        {
            "value": 70
        },
        {
            "value": 63
        },
        {
            "value": 50
        },
        {
            "value": 48
        },
        {
            "value": 37
        },
        {
            "value": 72
        },
        {
            "value": 55
        },
        {
            "value": 52
        },
        {
            "value": 50
        },
        {
            "value": 46
        },
        {
            "value": 65
        },
        {
            "value": 68
        },
        {
            "value": 60
        },
        {
            "value": 45
        },
        {
            "value": 54
        },
        {
            "value": 75
        },
        {
            "value": 49
        },
        {
            "value": 56
        },
        {
            "value": 47
        },
        {
            "value": 51
        },
        {
            "value": 62
        },
        {
            "value": 53
        },
        {
            "value": 71
        },
        {
            "value": 50
        },
        {
            "value": 40
        },
        {
            "value": 57
        },
        {
            "value": 36
        },
        {
            "value": 69
        },
        {
            "value": 42
        },
        {
            "value": 63
        },
        {
            "value": 44
        },
        {
            "value": 64
        },
        {
            "value": 77
        },
        {
            "value": 59
        },
        {
            "value": 50
        },
        {
            "value": 53
        },
        {
            "value": 61
        },
        {
            "value": 48
        },
        {
            "value": 58
        },
        {
            "value": 66
        },
        {
            "value": 51
        },
        {
            "value": 39
        },
        {
            "value": 60
        },
        {
            "value": 56
        },
        {
            "value": 57
        },
        {
            "value": 67
        },
        {
            "value": 64
        },
        {
            "value": 53
        },
        {
            "value": 73
        },
        {
            "value": 50
        },
        {
            "value": 45
        },
        {
            "value": 61
        },
        {
            "value": 58
        },
        {
            "value": 54
        },
        {
            "value": 68
        },
        {
            "value": 41
        },
        {
            "value": 62
        },
        {
            "value": 50
        },
        {
            "value": 46
        },
        {
            "value": 70
        },
        {
            "value": 42
        },
        {
            "value": 69
        },
        {
            "value": 55
        },
        {
            "value": 60
        },
        {
            "value": 51
        },
        {
            "value": 66
        },
        {
            "value": 48
        },
        {
            "value": 59
        },
        {
            "value": 52
        },
        {
            "value": 63
        },
        {
            "value": 57
        },
        {
            "value": 61
        },
        {
            "value": 74
        },
        {
            "value": 65
        },
        {
            "value": 55
        },
        {
            "value": 47
        },
        {
            "value": 53
        },
        {
            "value": 68
        },
        {
            "value": 62
        },
        {
            "value": 49
        },
        {
            "value": 58
        },
        {
            "value": 66
        },
        {
            "value": 50
        },
        {
            "value": 44
        },
        {
            "value": 72
        },
        {
            "value": 41
        }
    ],
    "binNumber": 10
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

const CodeComponent = withChartCode({
  components: { [ChartType.Histogram]: Histogram },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="直方图可视化一下我的数据"
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
