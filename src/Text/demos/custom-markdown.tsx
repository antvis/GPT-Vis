import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Bubble, type BubbleProps } from '@ant-design/x';
import { ConfigProvider, GPTVis, VisText } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
<vis-text type="metric_name">DAU</vis-text> 是 <vis-text type="metric_value">1.23亿</vis-text>，环比昨日 <vis-text type="delta_value_pos">80万</vis-text>(<vis-text type="ratio_value_pos">2.3%</vis-text>)，<vis-text type="action_recommendation">建议保持关注</vis-text>。
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ 'vis-text': VisText }}>{content}</GPTVis>
);

export default () => (
  <ConfigProvider
    components={{
      VisText: {
        __statics: {
          'icon:antd-up': CaretUpOutlined,
          'icon:antd-down': CaretDownOutlined,
        },
        delta_value_pos: {
          color: '#13A8A8',
          prefix: 'icon:antd-up',
        },
        delta_value_neg: {
          color: '#FA541C',
          prefix: 'icon:antd-down',
        },
        ratio_value_pos: {
          color: '#13A8A8',
          prefix: '↑',
        },
        ratio_value_neg: {
          color: '#FA541C',
          prefix: '↓',
        },
        action_recommendation: {
          backgroundColor: 'antiquewhite',
        },
      },
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
