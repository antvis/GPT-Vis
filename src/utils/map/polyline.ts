import { LineLayer } from '@antv/l7';
import type { Polyline as PolylinePorps } from '../../types/map';

export function setPolyline(data: PolylinePorps[]) {
  const lineData = data.map((item: PolylinePorps) => {
    const coord = item.points.map((point) => [point.longitude, point.latitude]);
    return {
      ...item,
      coordinates: coord,
      color: item.color,
      width: item.width,
    };
  });
  const isdash = lineData[0].dottedLine;
  const lineLayer = new LineLayer()
    .source(lineData, {
      parser: {
        type: 'json',
        coordinates: 'coordinates',
      },
    })
    .size('width')
    .shape('line')
    .color('color')
    .style({
      opacity: 1.0,
      lineType: isdash ? 'dash' : 'solid',
      dashArray: [3, 1],
    });
  return [lineLayer];
}
