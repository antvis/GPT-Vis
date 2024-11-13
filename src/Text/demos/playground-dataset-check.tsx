import { UserOutlined } from '@ant-design/icons';
import { Bubble, type BubbleProps } from '@ant-design/x';
import { ConfigProvider, GPTVis, VisText } from '@antv/gpt-vis';
import type { UploadProps } from 'antd';
import { Button, message, Row, Space, Upload, type GetProp } from 'antd';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';

const presetDataset = [
  {
    prompt: '本季度销售额达到3.45亿，环比增长500万（+1.5%），主要得益于线上渠道的持续增长。',
    answer:
      '<vis-text type="filter">本季度</vis-text><vis-text type="metric_name">销售额</vis-text> 达到 <vis-text type="metric_value">3.45亿</vis-text>，环比增长 <vis-text type="delta_value_pos">500万</vis-text>（<vis-text type="ratio_value_pos">1.5%</vis-text>），主要得益于 <vis-text type="metric_name">线上渠道</vis-text> 的持续增长。',
  },
  {
    prompt: '用户活跃度达到800万，较上月提高80万（+11%），用户留存率保持在90%。',
    answer:
      '<vis-text type="metric_name">用户活跃度</vis-text> 达到 <vis-text type="metric_value">800万</vis-text>，较上月提高 <vis-text type="delta_value_pos">80万</vis-text>（<vis-text type="ratio_value_pos">11%</vis-text>），<vis-text type="metric_name">用户留存率</vis-text> 保持在 <vis-text type="ratio_value">90%</vis-text>。',
  },
  {
    prompt: '新用户注册数达到50万，环比增长20万（+66.7%），主要来自社交媒体的推广效果。',
    answer:
      '<vis-text type="metric_name">新用户注册数</vis-text> 达到 <vis-text type="metric_value">50万</vis-text>，环比增长 <vis-text type="delta_value_pos">20万</vis-text>（<vis-text type="ratio_value_pos">66.7%</vis-text>），主要来自 <vis-text type="metric_name">社交媒体</vis-text> 的推广效果。',
  },
  {
    prompt: '市场份额达到15%，相比去年提升3个百分点，主要原因是产品的质量提升和服务的优化。',
    answer:
      '<vis-text type="metric_name">市场份额</vis-text> 达到 <vis-text type="metric_value">15%</vis-text>，相比去年提升 <vis-text type="delta_value_pos">3个百分点</vis-text>，主要原因是 <vis-text type="metric_name">产品</vis-text> 的质量提升和 <vis-text type="metric_name">服务</vis-text> 的优化。',
  },
  {
    prompt: '本月广告收入达到1.2亿，环比下降200万（-1.6%），受到市场竞争加剧的影响。',
    answer:
      '<vis-text type="metric_name">广告收入</vis-text> 达到 <vis-text type="metric_value">1.2亿</vis-text>，环比下降 <vis-text type="delta_value_neg">200万</vis-text>（<vis-text type="ratio_value_neg">1.6%</vis-text>），受到 <vis-text type="metric_name">市场竞争</vis-text> 加剧的影响。',
  },
  {
    prompt: '客户满意度评分提升至88分，较上季度增加了5分，反映了服务质量的显著改善。',
    answer:
      '<vis-text type="metric_name">客户满意度评分</vis-text> 提升至 <vis-text type="metric_value">88分</vis-text>，较上季度增加了 <vis-text type="delta_value_pos">5分</vis-text>，反映了 <vis-text type="metric_name">服务质量</vis-text> 的显著改善。',
  },
  {
    prompt: '移动端访问量达到900万，环比增长150万（+20%），显示出用户对移动体验的偏好。',
    answer:
      '<vis-text type="metric_name">移动端访问量</vis-text> 达到 <vis-text type="metric_value">900万</vis-text>，环比增长 <vis-text type="delta_value_pos">150万</vis-text>（<vis-text type="ratio_value_pos">20%</vis-text>），显示出用户对 <vis-text type="metric_name">移动体验</vis-text> 的偏好。',
  },
  {
    prompt: '在线教育平台的课程完成率达到了75%，较上月提升了10个百分点，体现了用户学习积极性。',
    answer:
      '<vis-text type="metric_name">课程完成率</vis-text> 达到了 <vis-text type="metric_value">75%</vis-text>，较上月提升了 <vis-text type="delta_value_pos">10个百分点</vis-text>，体现了 <vis-text type="metric_name">用户</vis-text> 学习积极性。',
  },
  {
    prompt: '电商平台的退货率降低至5%，相比去年下降了2个百分点，优化了客户购物体验。',
    answer:
      '<vis-text type="metric_name">退货率</vis-text> 降低至 <vis-text type="metric_value">5%</vis-text>，相比去年下降了 <vis-text type="delta_value_neg">2个百分点</vis-text>，优化了 <vis-text type="metric_name">客户购物体验</vis-text>。',
  },
  {
    prompt: '年度利润达到1.5亿，较去年增长3000万（+25%），主要由于成本控制措施的实施。',
    answer:
      '<vis-text type="metric_name">年度利润</vis-text> 达到 <vis-text type="metric_value">1.5亿</vis-text>，较去年增长 <vis-text type="delta_value_pos">3000万</vis-text>（<vis-text type="ratio_value_pos">25%</vis-text>），主要由于 <vis-text type="metric_name">成本控制措施</vis-text> 的实施。',
  },
];

const bgStyle: CSSProperties = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
  maxHeight: 800,
  overflowY: 'auto',
};

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ 'vis-text': VisText }}>{content}</GPTVis>
);

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    avatar: {
      src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
    },
    typing: { step: 5, interval: 20 },
    messageRender: RenderMarkdown,
    style: {
      maxWidth: '80%',
    },
  },
  user: {
    placement: 'end',
    avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
  },
};

export default () => {
  const [dataset, setDataset] = useState(presetDataset);

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isJsonl = file.type === 'application/json' || file.name.endsWith('.jsonl');

    if (!isJsonl) {
      message.error('You can only upload JSONL files!');
    }

    return isJsonl;
  };

  const handleUpload: UploadProps['onChange'] = (rcFile) => {
    const file = rcFile.fileList[0]?.originFileObj;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      try {
        setDataset(JSON.parse(content as string));
      } catch (e) {
        message.error(`${e}`);
      }
    };
    if (file) reader.readAsText(file);
    return false;
  };

  const handleClear = () => {
    setDataset([]);
  };

  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Space>
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            multiple={false} // 不允许多选
          >
            <Button type="primary">点击上传训练数据集 jsonl 文件</Button>
          </Upload>
          <Button onClick={handleClear}>清空</Button>
        </Space>
      </Row>
      <div style={bgStyle}>
        <ConfigProvider
          components={{
            // TODO @羽熙 以下颜色标记是过程中为了方便训练集校验设置的，并非设计规范，之后随着能力与设计规范完善会逐步替换掉
            VisText: {
              filter: { backgroundColor: '#f0f2f6' },
              dim_name: { backgroundColor: '#e2edff' },
              metric_name: { backgroundColor: '#e7fcf1' },
              phenomenon: { color: '#5F00D9' },
              proportion: { suffix: '🕓' },
              trend: { suffix: '📈' },
            },
          }}
        >
          <Bubble.List
            roles={roles}
            items={dataset
              .map(({ prompt, answer }, i) => {
                return [
                  {
                    key: i + 'prompt',
                    role: 'user',
                    content: prompt,
                  },
                  {
                    key: i + 'answer',
                    role: 'ai',
                    content: answer,
                  },
                ];
              })
              .flat()}
          />
        </ConfigProvider>
      </div>
    </>
  );
};
