import { CHART_FONT_FAMILY } from '../util/tokens';
import { normalizeAnnotations } from './normalize';
import type { ResolvedAnnotationTheme } from './theme';
import type {
  Annotation,
  AnnotationDiagnostic,
  AnnotationTone,
  AnnotationValue,
  CartesianAnnotationTarget,
} from './types';

export interface CartesianAnnotationContext<T> {
  data: T[];
  getX: (datum: T) => AnnotationValue;
  getY: (datum: T) => number;
  getSeries?: (datum: T) => string | undefined;
  theme: ResolvedAnnotationTheme;
}

export interface CompiledAnnotations {
  background: any[];
  foreground: any[];
  diagnostics: AnnotationDiagnostic[];
}

interface ResolvedTarget {
  x: AnnotationValue;
  y: number;
}

const getToneColor = (tone: AnnotationTone | undefined, theme: ResolvedAnnotationTheme) =>
  theme.tones[tone ?? 'neutral'];

const matchesTarget = <T>(
  datum: T,
  target: CartesianAnnotationTarget,
  context: CartesianAnnotationContext<T>,
): boolean => {
  if (target.x !== undefined && context.getX(datum) !== target.x) return false;
  if (target.y !== undefined && context.getY(datum) !== target.y) return false;
  if (target.series !== undefined && context.getSeries?.(datum) !== target.series) return false;
  return true;
};

const resolveTarget = <T>(
  annotation: Extract<Annotation, { type: 'highlight' | 'callout' }>,
  context: CartesianAnnotationContext<T>,
): { target?: ResolvedTarget; diagnostic?: AnnotationDiagnostic } => {
  const matches = context.data.filter((datum) => matchesTarget(datum, annotation.target, context));

  if (matches.length === 0) {
    return {
      diagnostic: {
        code: 'ANNOTATION_TARGET_NOT_FOUND',
        message: `Target not found for ${annotation.type} annotation.`,
      },
    };
  }

  if (matches.length > 1) {
    return {
      diagnostic: {
        code: 'AMBIGUOUS_ANNOTATION_TARGET',
        message: `Target matched ${matches.length} data items for ${annotation.type} annotation.`,
      },
    };
  }

  const datum = matches[0];
  return {
    target: {
      x: context.getX(datum),
      y: context.getY(datum),
    },
  };
};

const getReferenceLabel = (
  label: string | undefined,
  channel: 'x' | 'y',
  color: string,
  theme: ResolvedAnnotationTheme,
  fontSize: number,
  fontWeight: number,
  offset: number,
) =>
  label
    ? [
        {
          text: () => label,
          position: channel === 'y' ? 'right' : 'top',
          fill: color,
          fontFamily: CHART_FONT_FAMILY,
          fontSize,
          fontWeight,
          background: true,
          backgroundFill: theme.background,
          backgroundFillOpacity: 1,
          backgroundPadding: [2, 4],
          backgroundRadius: 2,
          ...(channel === 'y' ? { dx: -offset } : { dy: offset }),
        },
      ]
    : undefined;

const compileReferenceLine = (
  annotation: Extract<Annotation, { type: 'reference-line' }>,
  theme: ResolvedAnnotationTheme,
) => {
  const color = getToneColor(annotation.tone, theme);
  return {
    type: annotation.channel === 'y' ? 'lineY' : 'lineX',
    data: [annotation.value],
    animate: false,
    tooltip: false,
    legend: false,
    style: {
      stroke: color,
      lineWidth: theme.referenceLine.lineWidth,
      lineDash: theme.referenceLine.lineDash,
      strokeOpacity: theme.referenceLine.opacity,
    },
    labels: getReferenceLabel(
      annotation.label,
      annotation.channel,
      color,
      theme,
      theme.referenceLine.labelFontSize,
      theme.referenceLine.labelFontWeight,
      theme.referenceLine.labelOffset,
    ),
  };
};

const compileReferenceBand = (
  annotation: Extract<Annotation, { type: 'reference-band' }>,
  theme: ResolvedAnnotationTheme,
) => {
  const color = getToneColor(annotation.tone, theme);
  return {
    type: annotation.channel === 'y' ? 'rangeY' : 'rangeX',
    data: [[annotation.from, annotation.to]],
    animate: false,
    tooltip: false,
    legend: false,
    style: {
      fill: color,
      fillOpacity: theme.referenceBand.fillOpacity,
      strokeOpacity: 0,
    },
    labels: getReferenceLabel(
      annotation.label,
      annotation.channel,
      color,
      theme,
      theme.referenceBand.labelFontSize,
      theme.referenceBand.labelFontWeight,
      theme.referenceBand.labelOffset,
    ),
  };
};

const compileHighlight = (
  annotation: Extract<Annotation, { type: 'highlight' }>,
  target: ResolvedTarget,
  theme: ResolvedAnnotationTheme,
) => {
  const color = getToneColor(annotation.tone, theme);
  return {
    type: 'point',
    data: [{ __annotation_x__: target.x, __annotation_y__: target.y }],
    encode: {
      x: '__annotation_x__',
      y: '__annotation_y__',
      shape: 'point',
      size: theme.highlight.size,
    },
    animate: false,
    tooltip: false,
    legend: false,
    style: {
      fill: theme.background,
      fillOpacity: theme.highlight.fillOpacity,
      stroke: color,
      lineWidth: theme.highlight.lineWidth,
    },
  };
};

const compileCallout = (
  annotation: Extract<Annotation, { type: 'callout' }>,
  target: ResolvedTarget,
  theme: ResolvedAnnotationTheme,
) => {
  const color = getToneColor(annotation.tone, theme);
  return {
    type: 'point',
    data: [{ __annotation_x__: target.x, __annotation_y__: target.y }],
    encode: {
      x: '__annotation_x__',
      y: '__annotation_y__',
      shape: 'point',
      size: theme.callout.markerSize,
    },
    animate: false,
    tooltip: false,
    legend: false,
    style: {
      fill: theme.background,
      stroke: color,
      lineWidth: theme.callout.markerLineWidth,
    },
    labels: [
      {
        text: () => annotation.label,
        position: 'top',
        dx: theme.callout.offsetX,
        dy: theme.callout.offsetY,
        textAlign: 'left',
        fill: theme.text,
        fontFamily: CHART_FONT_FAMILY,
        fontSize: theme.callout.labelFontSize,
        fontWeight: theme.callout.labelFontWeight,
        background: true,
        backgroundFill: theme.background,
        backgroundStroke: color,
        backgroundLineWidth: 1,
        backgroundPadding: theme.callout.labelPadding,
        backgroundRadius: theme.callout.labelRadius,
        connector: true,
        connectorStroke: color,
        connectorLineWidth: 1,
        transform: [{ type: 'overlapHide' }],
      },
    ],
  };
};

export const compileCartesianAnnotations = <T>(
  annotations: Annotation[] | undefined,
  context: CartesianAnnotationContext<T>,
): CompiledAnnotations => {
  const normalized = normalizeAnnotations(annotations);
  const background: any[] = [];
  const foreground: any[] = [];
  const diagnostics = [...normalized.diagnostics];

  for (const annotation of normalized.annotations) {
    if (annotation.type === 'reference-band') {
      background.push(compileReferenceBand(annotation, context.theme));
      continue;
    }

    if (annotation.type === 'reference-line') {
      background.push(compileReferenceLine(annotation, context.theme));
      continue;
    }

    const resolved = resolveTarget(annotation, context);
    if (resolved.diagnostic) {
      diagnostics.push(resolved.diagnostic);
      continue;
    }

    if (!resolved.target) continue;

    foreground.push(
      annotation.type === 'highlight'
        ? compileHighlight(annotation, resolved.target, context.theme)
        : compileCallout(annotation, resolved.target, context.theme),
    );
  }

  return { background, foreground, diagnostics };
};

export const reportAnnotationDiagnostics = (diagnostics: AnnotationDiagnostic[]): void => {
  for (const diagnostic of diagnostics) {
    console.warn(`[GPT-Vis] ${diagnostic.code}: ${diagnostic.message}`);
  }
};
