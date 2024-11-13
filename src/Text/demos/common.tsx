import { VisText } from '@antv/gpt-vis';
import { Descriptions, Space } from 'antd';
import React from 'react';

export default () => {
  return (
    <Descriptions bordered column={2} size="small">
      <Descriptions.Item label="指标名 metric_name">
        <VisText type="metric_name">DAU</VisText>
      </Descriptions.Item>
      <Descriptions.Item label="指标值 metric_value">
        <VisText type="metric_value" origin={9012334}>
          90.1w
        </VisText>
      </Descriptions.Item>
      <Descriptions.Item label="其他指标 other_metric_value">
        <VisText type="other_metric_value">30%</VisText>
      </Descriptions.Item>
      <Descriptions.Item label="差值 delta_value">
        <Space>
          <VisText type="delta_value_pos">100.33</VisText>
          <VisText type="delta_value_neg">100.33</VisText>
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="比率 ratio_value">
        <Space>
          <VisText type="ratio_value_pos">30%</VisText>
          <VisText type="ratio_value_neg">30%</VisText>
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="贡献度 contribute_ratio">
        <VisText type="contribute_ratio">20%</VisText>
      </Descriptions.Item>
      <Descriptions.Item label="趋势描述 trend_desc">
        <VisText type="trend_desc" origin={[1, 2, 6, 18, 24, 48]}>
          趋势上涨
        </VisText>
      </Descriptions.Item>
      <Descriptions.Item label="维度值 dim_value">
        <VisText type="dim_value">杭州</VisText>
      </Descriptions.Item>
      <Descriptions.Item label="时间描述 time_desc">
        <VisText type="time_desc">2021-10-11</VisText>
      </Descriptions.Item>
      <Descriptions.Item label="占比 proportion">
        <VisText type="proportion">30%</VisText>
      </Descriptions.Item>
    </Descriptions>
  );
};
