import type { ILayer, Scene } from '@antv/l7';
import { LarkMap } from '@antv/larkmap';
import React, { type FC } from 'react';
import type { BaseMapProps } from '../types';
import { formatMapStyle, setMapContext, setMapView, setMarkers, setPolyline } from '../utils/map';

export type MapProps = Omit<BaseMapProps<any>, 'data'>;

const Map: FC<MapProps> = (props) => {
  const { className, containerStyle, children } = props;
  const allLayers: ILayer[] = [];
  const mapConfig = formatMapStyle(props);

  const onSceneLoaded = async (scene: Scene) => {
    // 初始地图视野
    setMapView(props, scene);
    // 初始化地图资源和状态
    await setMapContext(props, scene);

    // 添加线图层
    if (props.polyline) {
      const polylineLayer = setPolyline(props.polyline || []);
      allLayers.push(...polylineLayer);
    }

    // 添加标记
    if (props.markers) {
      const markerLayer = setMarkers(props.markers || []);
      allLayers.push(...markerLayer);
    }

    allLayers.forEach((item) => {
      scene.addLayer(item);
    });
  };

  return (
    <LarkMap
      className={className}
      style={{ height: 300, ...containerStyle }}
      {...mapConfig}
      onSceneLoaded={onSceneLoaded}
    >
      {children}
    </LarkMap>
  );
};

export default Map;
