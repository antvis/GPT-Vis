import { isArray, isString, size } from 'lodash';
import React, { useMemo } from 'react';
import { TEXT_THEME } from '../../theme';
import type { VisTextProps } from '../../types';
import { useSvgWrapper } from '../hooks';
import { useLineCompute } from './useLineCompute';

const LINEAR_FILL_COLOR_ID = 'wsc-line-fill';

function getLineChartData(origin: any) {
  if (isArray(origin)) return origin;
  if (isString(origin)) {
    try {
      const data = JSON.parse(origin);
      if (isArray(data)) return data;
    } catch (e) {
      console.warn(e, `${origin} is not a valid json string`);
    }
  }
}

export const SingleLineChart: React.FC<VisTextProps> = ({ origin }) => {
  const [Svg, fontSize] = useSvgWrapper();
  const data = useMemo(() => getLineChartData(origin), [origin]);
  const { width, height, linePath, polygonPath } = useLineCompute(fontSize, data);
  return (
    size(data) > 0 && (
      <Svg width={width} height={height}>
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="122.389541%" id={LINEAR_FILL_COLOR_ID}>
            <stop stopColor={TEXT_THEME.chart.lineStrokeColor} offset="0%" />
            <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%" />
          </linearGradient>
        </defs>
        {linePath && (
          <path d={linePath} stroke={TEXT_THEME.chart.lineStrokeColor} fill="transparent" />
        )}
        {polygonPath && <polygon points={polygonPath} fill={`url(#${LINEAR_FILL_COLOR_ID})`} />}
      </Svg>
    )
  );
};
