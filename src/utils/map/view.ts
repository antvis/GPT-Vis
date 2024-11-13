import type { Scene } from '@antv/l7';
import type { Map } from '../../types/map';

function fitIncludePoints(
  includePoints: { longitude: number; latitude: number }[],
  scene: Scene,
  includePadding: Map['includePadding'],
) {
  if (includePoints.length === 1) {
    scene.setCenter([includePoints[0].longitude, includePoints[0].latitude]);
  } else {
    const bounds = [180, 90, -180, -90];
    includePoints.forEach((point: any) => {
      if (bounds[0] > point.longitude) {
        bounds[0] = point.longitude;
      }
      if (bounds[1] > point.latitude) {
        bounds[1] = point.latitude;
      }
      if (bounds[2] < point.longitude) {
        bounds[2] = point.longitude;
      }
      if (bounds[3] < point.latitude) {
        bounds[3] = point.latitude;
      }
    });
    const { left = 20, right = 20, bottom = 20, top = 20 } = includePadding || {};
    const padding = [left, top, right, bottom];
    // @ts-ignore
    scene.map.setBounds(bounds, false, padding);
  }
}

export const setMapView = (props: Map, scene: Scene) => {
  // 单个点,多个点
  if (props.includePoints) {
    fitIncludePoints(props.includePoints, scene, props.includePadding);
  } else {
    const points: { longitude: number; latitude: number }[] = [];
    if (props.markers) {
      props.markers.forEach((item) => {
        points.push({ longitude: item.longitude, latitude: item.latitude });
      });
    }
    if (props.polyline) {
      props.polyline.forEach((item) => {
        item.points.forEach((point) => {
          points.push({ longitude: point.longitude, latitude: point.latitude });
        });
      });
    }
    if (points.length) {
      fitIncludePoints(points, scene, props.includePadding);
    }
  }

  if (props.enableZoom !== undefined) {
    scene.setMapStatus({
      zoomEnable: props.enableZoom,
    });
  }
  if (props.enableRotate !== undefined) {
    scene.setMapStatus({
      rotateEnable: props.enableRotate,
    });
  }
  if (props.enableScroll !== undefined) {
    scene.setMapStatus({
      dragEnable: props.enableScroll,
    });
  }

  if (props.onInitComplete) {
    scene.off('loaded', props.onInitComplete);
    scene.on('loaded', props.onInitComplete);
  }
};
