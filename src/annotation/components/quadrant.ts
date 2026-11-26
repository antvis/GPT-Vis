import type { Annotation } from '../../types/annotation';
import type { AnnotationComponent } from '../registry';
import { axisPosition, finiteValue } from '../utils';
import { path } from './path';
import { range } from './range';
import { text } from './text';

/** Four named decision regions share the chart's numeric dividers and theme. */
export const quadrant: AnnotationComponent<'quadrant'> = {
  g2: (annotations, { mapping, defaults }) =>
    annotations.flatMap((annotation) => {
      if (
        !annotation.data ||
        Object.keys(annotation.data).some((key) => key !== mapping.x && key !== mapping.y)
      )
        throw new Error('Invalid annotation: quadrant needs both axis coordinates.');
      const x = finiteValue(annotation.data[mapping.x], mapping.x);
      const y = finiteValue(annotation.data[mapping.y], mapping.y);
      const hidden = annotation.label === '';
      const regions = (['topRight', 'topLeft', 'bottomLeft', 'bottomRight'] as const).flatMap(
        (name, i) => {
          const right = name.endsWith('Right');
          const top = name.startsWith('top');
          const bounds: NonNullable<Parameters<typeof range.create>[1]> = (context) => {
            const splitX = Math.max(0, Math.min(1, context.axisValue('x', x)));
            const splitY = Math.max(0, Math.min(1, context.axisValue('y', y)));
            return [
              [right ? splitX : 0, top ? 0 : splitY],
              [right ? 1 : splitX, top ? splitY : 1],
            ];
          };
          const label = hidden
            ? ''
            : (annotation.labels?.[name] ??
              `${right ? 'High' : 'Low'} ${mapping.x} · ${top ? 'High' : 'Low'} ${mapping.y}`);
          return [
            ...range.create(
              {
                data: { [mapping.x]: [x, x], [mapping.y]: [y, y] } as Extract<
                  Annotation<(typeof mapping.data)[number]>,
                  { type: 'range' }
                >['data'],
                label: '',
                style: {
                  fill: annotation.style?.fill ?? defaults.palette[i % defaults.palette.length],
                  fillOpacity: annotation.style?.fillOpacity ?? 0.06,
                },
              },
              bounds,
            ),
            ...(label
              ? text.create(
                  {
                    data: annotation.data,
                    label,
                    style: {
                      labelFill: annotation.style?.labelFill,
                      labelFontSize: annotation.style?.labelFontSize,
                    },
                  },
                  (context, coordinate) => {
                    const [from, to] = bounds(context);
                    if (to[0] <= from[0] || to[1] <= from[1]) return undefined;
                    const inset = Math.min((to[1] - from[1]) / 2, 18 / coordinate.getSize()[1]);
                    return [(from[0] + to[0]) / 2, from[1] + inset];
                  },
                )
              : []),
          ];
        },
      );
      const dividers = (['x', 'y'] as const).flatMap((axis) => {
        const field = mapping[axis];
        const value = axis === 'x' ? x : y;
        return path.create({
          data: axisPosition(field, value),
          label: annotation.label ?? `${axis.toUpperCase()}: ${value}`,
          style: { lineDash: [4, 4], ...annotation.style },
        });
      });
      return [...regions, ...dividers];
    }),
};
