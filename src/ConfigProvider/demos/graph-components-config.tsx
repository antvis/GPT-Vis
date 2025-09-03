import { ConfigProvider, GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = `
 ~~~vis-chart
{
  "type": "mind-map",
  "data": {
    "name": "台风形成的因素",
    "children": [
      {
        "name": "气象条件",
        "children": [
          { "name": "温暖的海水" },
          { "name": "气压分布" },
          { "name": "湿度水平" },
          { "name": "风的切变" }
        ]
      },
      {
        "name": "地理环境",
        "children": [
          { "name": "大陆架的形状与深度" },
          { "name": "海洋暖流的分布" },
          { "name": "热带地区的气候特征" },
          { "name": "岛屿的影响" }
        ]
      }
    ]
  }
}
~~~`;

const mindmapConfig = {
  type: 'linear',
  direction: 'right',
  behaviors: (behaviors: any[]) => [
    // console.log(behaviors) 👉 [{ key: 'zoom-canvas', type: 'zoom-canvas' }, { key: 'drag-canvas', type: 'drag-canvas' }]
    // 默认启用两个交互，缩放画布和拖拽画布。此处移除缩放画布并添加拖拽元素
    ...behaviors.filter((behavior) => behavior.key !== 'zoom-canvas'),
    {
      key: 'drag-element',
      type: 'drag-element',
    },
  ],
  transforms: (prev: any[]) => [
    // 默认节点支持折叠展开，此处禁用
    ...prev.filter((transform) => transform.key !== 'collapse-expand-react-node'),
    {
      ...prev.find((transform) => transform.key === 'collapse-expand-react-node'),
      enable: false,
    },
  ],
};

export default () => (
  <ConfigProvider
    components={{
      MindMap: mindmapConfig,
    }}
  >
    <GPTVis>{content}</GPTVis>
  </ConfigProvider>
);
