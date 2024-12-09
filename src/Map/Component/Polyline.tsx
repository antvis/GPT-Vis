import type { ILayer } from '@antv/l7';
import { useScene } from '@antv/larkmap';
import { useEffect, useState } from 'react';
import type { Map } from '../../types/map';
import { setPolyline } from '../../utils/map';
// 更新地图视野
export default (props: Map) => {
  const scene = useScene();
  const [layers, setLayers] = useState<ILayer[]>([]);
  const removeLayers = () => {
    layers.forEach((item) => {
      scene.removeLayer(item);
    });
  };
  useEffect(() => {
    if (!props.polyline) return;
    const lineLayers = setPolyline(props.polyline || []);
    removeLayers();
    console.log('lineLayers', lineLayers);
    lineLayers.forEach((item) => {
      scene.addLayer(item);
    });
    setLayers(lineLayers);

    return () => {
      removeLayers();
    };
  }, [props.polyline]);

  return null;
};
