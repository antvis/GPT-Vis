import { NetworkGraph } from '@antv/gpt-vis';
import React from 'react';

const data = {
  nodes: [
    { name: '哈利·波特' },
    { name: '赫敏·格兰杰' },
    { name: '罗恩·韦斯莱' },
    { name: '伏地魔' },
  ],
  edges: [
    { source: '哈利·波特', target: '赫敏·格兰杰', name: '朋友' },
    { source: '哈利·波特', target: '罗恩·韦斯莱', name: '朋友' },
    { source: '哈利·波特', target: '伏地魔', name: '敌人' },
    { source: '伏地魔', target: '哈利·波特', name: '试图杀死' },
  ],
};

export default () => <NetworkGraph data={data} containerStyle={{ height: 300 }} />;
