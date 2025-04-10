import { isObject } from 'lodash';
import type { MapProps } from '../../Map';
import type { LarkMapProps } from '../../types';
import type { Marker, MarkerData, Polyline } from '../../types/map';

const DefaultMapConfig = {
  mapOptions: {
    center: [120.210792, 30.246026] as [number, number],
    zoom: 16,
    maxZoom: 18,
    pitch: 0,
    rotation: 0,
    zoomEnable: true,
    pitchEnable: true,
  },
};

const formatMapStyle = (props: MapProps) => {
  const config: LarkMapProps = {
    mapOptions: {
      ...DefaultMapConfig.mapOptions,
      center:
        props.longitude && props.latitude
          ? ([props.longitude, props.latitude] as [number, number])
          : DefaultMapConfig.mapOptions.center,
      zoom: props.scale || DefaultMapConfig.mapOptions.zoom,
      pitch: props.skew || DefaultMapConfig.mapOptions.pitch,
      rotation: props.rotate || DefaultMapConfig.mapOptions.rotation,
      zoomEnable: props.enableZoom || DefaultMapConfig.mapOptions.zoomEnable,
      pitchEnable: props.enableRotate || DefaultMapConfig.mapOptions.pitchEnable,
      // 地图底图样式
      style: props?.mapType,
      // 高德地图密钥
      token: props?.token,
    },
    logoVisible: false,
  };
  return config;
};

const DefaultMarkerStyle = {
  width: 12,
  anchorX: 0,
  anchorY: 1,
  label: {
    content: '',
    color: '#000000',
    fontSize: 10,
    borderRadius: 5,
    bgColor: '#ffffff',
    padding: 5,
  },
  iconPath:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3XdDTbsQ84QAAAAAAAAAAAAADmJ7AQ/original',
};

const formatMakerStyle = (data: MarkerData[], markerStyle?: Partial<Marker>) => {
  const labelStyle = Object.assign({}, DefaultMarkerStyle.label, markerStyle?.label);
  // label 优先级 data > markerStyle > DefaultMarkerStyle
  return data.map((marker: MarkerData, index: number) => {
    const { label, id, ...rest } = marker;
    return {
      ...DefaultMarkerStyle,
      ...markerStyle,
      ...rest,
      label: {
        ...labelStyle,
        ...(isObject(label) ? label : { content: label }),
      },
      id: id || index.toString(),
    };
  });
};

const DefaultPolylineStyle = {
  width: 2,
  color: '#16f',
  dottedLine: false,
  zIndex: 1,
};

const formatPolylineStyle = (data: Polyline[], polylineStyle?: Partial<Marker>) => {
  return data.map((item: any) => {
    return {
      ...DefaultPolylineStyle,
      ...polylineStyle,
      ...item,
    };
  });
};

export {
  DefaultMarkerStyle,
  DefaultPolylineStyle,
  formatMakerStyle,
  formatMapStyle,
  formatPolylineStyle,
};
