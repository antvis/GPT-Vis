import { LarkMap } from '@antv/larkmap';
import React, { useMemo, type FC } from 'react';
import type { BaseMapProps } from '../types';
import { formatMapStyle } from '../utils/map';
import { MapView, Marker, Polyline } from './Component/';

export type MapProps = Omit<BaseMapProps<any>, 'data'>;

const Map: FC<MapProps> = (props) => {
  const { className, containerStyle, children } = props;
  const mapConfig = useMemo(() => formatMapStyle(props), [props]);
  const onSceneLoaded = async () => {
    if (props.onInitComplete) {
      props.onInitComplete();
    }
  };

  return (
    <LarkMap
      className={className}
      style={{ height: 300, ...containerStyle }}
      {...mapConfig}
      onSceneLoaded={onSceneLoaded}
    >
      {/* 设置地图状态 */}
      <MapView {...props} />
      {/* 初始化图片，并加载 Marker */}
      <Marker {...props} />
      {/* 初始化线，并加载 Polyline */}
      <Polyline {...props} />

      {children}
    </LarkMap>
  );
};

export default Map;
