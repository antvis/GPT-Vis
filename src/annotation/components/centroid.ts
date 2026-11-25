import type { Annotation } from '../../types/annotation';
import type { AnnotationComponent } from '../registry';
import { finiteValue, numericRows, selectRows } from '../utils';
import { point } from './point';

export const centroid: AnnotationComponent<'centroid'> = {
  g2: (annotations, { mapping, defaults }) =>
    annotations.flatMap((annotation) => {
      const rows = selectRows(mapping.data, annotation.data);
      const xs = numericRows(rows, mapping.x);
      const ys = new Set(numericRows(rows, mapping.y).map(({ row }) => row));
      const selected = xs.filter(({ row }) => ys.has(row)).map(({ row }) => row);
      if (!selected.length) return [];
      const weights = selected.map((row) =>
        annotation.weight === undefined ? 1 : finiteValue(row[annotation.weight], 'weight'),
      );
      if (weights.some((weight) => weight < 0))
        throw new Error('Invalid annotation: centroid weights must be nonnegative.');
      const max = weights.reduce((a, b) => Math.max(a, b), 0);
      if (max === 0) throw new Error('Invalid annotation: centroid needs positive total weight.');
      const normalized = weights.map((weight) => weight / max);
      const total = normalized.reduce((a, b) => a + b, 0);
      const center = (field: keyof (typeof mapping.data)[number] & string) => {
        const values = selected.map((row) => finiteValue(row[field], field));
        const scale = values.reduce((a, b) => Math.max(a, Math.abs(b)), 0);
        return scale === 0
          ? 0
          : values.reduce((sum, value, i) => sum + (value / scale) * (normalized[i] / total), 0) *
              scale;
      };
      return point.create(
        {
          data: { [mapping.x]: center(mapping.x), [mapping.y]: center(mapping.y) } as Extract<
            Annotation<(typeof mapping.data)[number]>,
            { type: 'point' }
          >['data'],
          label:
            annotation.label ?? (annotation.weight === undefined ? 'Center' : 'Weighted center'),
          pulse: annotation.pulse ?? false,
          style: {
            ...annotation.style,
            size: annotation.style?.size ?? Math.max(defaults.size, 7),
            lineWidth: annotation.style?.lineWidth ?? 2,
            fill: annotation.style?.fill ?? 'none',
          },
        },
        {
          shape: 'plus',
          outline: annotation.style?.stroke ?? defaults.stroke,
          halo: annotation.pulse === true,
          zIndex: 2,
        },
      );
    }),
};
