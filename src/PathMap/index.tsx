import React, { useMemo, type FC } from 'react';
import { useMapConfig } from '../ConfigProvider/hooks';
import type { MapProps } from '../Map';
import Map from '../Map';
import type { PathMap as _PathMap, MarkerData, Polyline } from '../types/map';
import { formatMakerStyle, formatPolylineStyle } from '../utils/map';

export type PathMapProps = MapProps & _PathMap;

const PathMap: FC<PathMapProps> = (props) => {
  const { data, markerStyle, pathStyle, ...rest } = useMapConfig('PathMap', props);

  const markerdata = useMemo(() => {
    const markers: MarkerData[] = [];
    (data || []).forEach((item) => {
      if (item.markers) {
        markers.push(...item.markers);
      }
    });
    return formatMakerStyle(markers, markerStyle);
  }, [data, markerStyle]);

  const linedata = useMemo(() => {
    const lines = (data || []).map((item) => {
      return item.path;
    }) as Polyline[];
    return formatPolylineStyle(lines, pathStyle);
  }, [data, pathStyle]);

  return <Map markers={markerdata} polyline={linedata} {...rest} />;
};

export default PathMap;
