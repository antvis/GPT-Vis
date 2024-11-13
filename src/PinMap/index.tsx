import React, { useMemo, type FC } from 'react';
import { useMapConfig } from '../ConfigProvider/hooks';
import type { MapProps } from '../Map';
import Map from '../Map';
import type { PinMap as PinMapType } from '../types/map';
import { formatMakerStyle } from '../utils/map';

export type PinMapProps = PinMapType & MapProps;

const PinMap: FC<PinMapProps> = (props) => {
  const { data = [], markerStyle = {}, ...rest } = useMapConfig('PinMap', props);

  const markerdata = useMemo(() => formatMakerStyle(data, markerStyle), [data, markerStyle]);

  return <Map markers={markerdata} includePoints={markerdata} {...rest} />;
};

export default PinMap;
