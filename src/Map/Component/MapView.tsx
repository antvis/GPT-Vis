import { useScene } from '@antv/larkmap';
import { useEffect } from 'react';
import type { Map } from '../../types/map';
import { fitBounds, setMapStatus, setMapView } from '../../utils/map';

// 更新地图视野
export default (props: Map) => {
  const scene = useScene();
  useEffect(() => {
    setMapView(props, scene);
  }, []);
  useEffect(() => {
    setMapStatus(props, scene);
  }, [props.enableRotate, props.enableScroll, props.enableZoom]);
  useEffect(() => {
    fitBounds(props, scene);
  }, [props.includePoints, props.markers, props.polyline, props.includePadding]);

  return null;
};
