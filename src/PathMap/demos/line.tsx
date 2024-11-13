import { PathMap } from '@antv/gpt-vis';
import React from 'react';

const data = [
  {
    points: [
      { longitude: 120.130638, latitude: 30.219835, label: '石屋洞' },
      { longitude: 120.128125, latitude: 30.219386, label: '满觉陇' },
      { longitude: 120.118362, latitude: 30.217175, label: '杨梅岭' },
      { longitude: 120.112958, latitude: 30.207319, label: '理安寺' },
      { longitude: 120.11335, latitude: 30.202395, label: '九溪烟树' },
    ],
  },
  {
    points: [
      { longitude: 120.100549, latitude: 30.236875, label: '飞来峰' },
      { longitude: 120.101406, latitude: 30.240826, label: '灵隐寺' },
      { longitude: 120.105337, latitude: 30.236818, label: '天竺三寺' },
    ],
  },
  {
    points: [
      { longitude: 120.116979, latitude: 30.252876, label: '杭州植物园' },
      { longitude: 120.127654, latitude: 30.245663, label: '杭州花圃' },
      { longitude: 120.135764, latitude: 30.251448, label: '苏堤' },
    ],
  },
  {
    points: [
      { longitude: 120.130095, latitude: 30.207505, label: '虎跑公园' },
      { longitude: 120.145323, latitude: 30.214993, label: '玉皇飞云' },
      { longitude: 120.155057, latitude: 30.232985, label: '长桥公园' },
    ],
  },
];
const routeData = data.map((item) => {
  return {
    path: item,
    markers: item.points,
  };
});

const markerStyle = {
  iconPath:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ufrWTqCNCScAAAAAAAAAAAAADmJ7AQ/original',
  width: 5,
  anchorY: 1,
  label: {
    color: '#735142',
    fontSize: 10,
    bgColor: '#ffffff',
  },
};

const pathStyle = {
  color: '#86f',
  width: 1,
  dottedLine: true,
};

export default () => {
  return (
    <PathMap
      data={routeData}
      pathStyle={pathStyle}
      markerStyle={markerStyle}
      mapType="amap://styles/2acc71263b1344d93a902db8df1c8b68"
    />
  );
};
