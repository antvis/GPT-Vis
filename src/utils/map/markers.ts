import { PointLayer } from '@antv/l7';
import { isObject } from 'lodash';
import type { Marker as MarkerProps } from '../../types/map';
import { urlToMarkerId } from './util';

export function setMarkers(data: MarkerProps[]) {
  const items = data.map((item: MarkerProps) => {
    return {
      ...item,
      label: isObject(item.label) ? item.label!.content : item.label,
      color: item.label?.color,
      bgColor: item.label?.bgColor,
      fontSize: item.label?.fontSize,
      offsets: [item.anchorX || 0, item.anchorY || -1],
      iconPath: item.iconPath ? urlToMarkerId(item.iconPath) : undefined,
    };
  });
  const icons = items.filter((item) => item.iconPath !== undefined);
  const texts = items.filter((item) => item.label !== undefined);
  const layers = [];
  if (texts.length > 0) {
    const offsets = texts[0].offsets;
    const fontSize = texts[0].fontSize || 10;
    const text = new PointLayer({
      zIndex: 2,
    })
      .source(texts, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('label', 'text')
      .size('fontSize')
      .color('color')
      .style({
        opacity: 1,
        textOffset: [offsets[0], -2 * offsets[1] * fontSize],
        fontWeight: 600,
        textAnchor: 'center',
        stroke: texts[0].bgColor || '#ffffff', // 描边颜色
        strokeWidth: 2, // 描边宽度
        strokeOpacity: 1.0,
        padding: [10, 10],
      });
    layers.push(text);
  }
  if (icons.length !== 0) {
    const offsets = icons[0].offsets;

    const width = icons[0].width || 10;
    const iconLayer = new PointLayer()
      .source(icons, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('iconPath')
      .size('width')
      .style({
        offsets: [offsets[0], offsets[1] * width],
      });
    layers.push(iconLayer);
  }
  return layers;
}
