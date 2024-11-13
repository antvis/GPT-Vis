import type { HeatmapLayerProps } from '@antv/larkmap';
import { HeatmapLayer } from '@antv/larkmap';
import React, { useMemo, type FC } from 'react';
import { useMapConfig } from '../ConfigProvider/hooks';
import type { MapProps } from '../Map';
import Map from '../Map';

const heapLayerOptions: Omit<HeatmapLayerProps, 'source'> = {
  autoFit: true,
  shape: 'heatmap' as const,
  size: {
    field: 'value',
    value: [0, 1],
  },
  style: {
    intensity: 3,
    radius: 20,
    opacity: 1,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

type GeoData = {
  longitude: number;
  latitude: number;
  value: number;
};

export type HeatMapProps = MapProps & {
  data?: GeoData[];
};

const HeatMap: FC<HeatMapProps> = (props) => {
  const { children, data = [], ...mapConfigRest } = useMapConfig('HeatMap', props);

  const source = useMemo(
    () => ({
      data,
      parser: { type: 'json', x: 'longitude', y: 'latitude' },
    }),
    [data],
  );

  return (
    <>
      <Map {...mapConfigRest}>
        <HeatmapLayer {...heapLayerOptions} source={source} />
        {children}
      </Map>
    </>
  );
};

export default HeatMap;
