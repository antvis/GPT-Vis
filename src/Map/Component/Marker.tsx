import type { ILayer } from '@antv/l7';
import { useScene } from '@antv/larkmap';
import { useEffect, useState } from 'react';
import type { Map } from '../../types/map';
import { setMapContext, setMarkers } from '../../utils/map';
// 渲染标记点
export default (props: Map) => {
  const scene = useScene();
  const [layers, setLayers] = useState<ILayer[]>([]);
  const removeLayers = () => {
    layers.forEach((item) => {
      scene.removeLayer(item);
    });
  };
  useEffect(() => {
    if (!props.markers) return;
    // 异步调用
    setMapContext(props, scene)?.then(() => {
      // 初始化资源
      const markerLayer = setMarkers(props.markers || []);
      removeLayers();
      markerLayer.forEach((item) => {
        scene.addLayer(item);
      });
      setLayers(markerLayer);
    });
    return () => {
      removeLayers();
    };
  }, [props.markers]);

  return null;
};
