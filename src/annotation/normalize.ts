import type {
  Annotation,
  AnnotationDiagnostic,
  AnnotationTone,
  AnnotationValue,
  CartesianAnnotationTarget,
} from './types';

export interface NormalizeAnnotationsResult {
  annotations: Annotation[];
  diagnostics: AnnotationDiagnostic[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isValidValue = (value: unknown): value is AnnotationValue =>
  typeof value === 'string' ? value.length > 0 : Number.isFinite(value);

const isValidTarget = (target: unknown): target is CartesianAnnotationTarget => {
  if (!isRecord(target)) return false;

  const hasChannel =
    target.x !== undefined || target.y !== undefined || target.series !== undefined;
  if (!hasChannel) return false;
  if (target.x !== undefined && !isValidValue(target.x)) return false;
  if (target.y !== undefined && !Number.isFinite(target.y)) return false;
  return (
    target.series === undefined || (typeof target.series === 'string' && target.series.length > 0)
  );
};

const annotationTypes = new Set(['reference-line', 'reference-band', 'highlight', 'callout']);
const annotationTones = new Set<AnnotationTone>([
  'neutral',
  'info',
  'positive',
  'warning',
  'negative',
]);

const hasValidTone = (tone: unknown): tone is AnnotationTone | undefined =>
  tone === undefined || (typeof tone === 'string' && annotationTones.has(tone as AnnotationTone));

const hasValidOptionalLabel = (label: unknown): label is string | undefined =>
  label === undefined || typeof label === 'string';

export const normalizeAnnotations = (annotations: unknown): NormalizeAnnotationsResult => {
  const normalized: Annotation[] = [];
  const diagnostics: AnnotationDiagnostic[] = [];

  if (annotations === undefined) return { annotations: normalized, diagnostics };

  if (!Array.isArray(annotations)) {
    diagnostics.push({
      code: 'INVALID_ANNOTATIONS',
      message: 'Annotations must be an array.',
    });
    return { annotations: normalized, diagnostics };
  }

  for (const [index, annotation] of annotations.entries()) {
    if (!isRecord(annotation)) {
      diagnostics.push({
        code: 'INVALID_ANNOTATIONS',
        message: `Annotation at index ${index} must be an object.`,
      });
      continue;
    }

    if (annotation.visible === false) continue;

    if (typeof annotation.type !== 'string' || !annotationTypes.has(annotation.type)) {
      diagnostics.push({
        code: 'UNSUPPORTED_ANNOTATION_TYPE',
        message: `Unsupported annotation type at index ${index}.`,
      });
      continue;
    }

    if (!hasValidTone(annotation.tone)) {
      diagnostics.push({
        code: 'INVALID_ANNOTATION_VALUE',
        message: `Invalid annotation tone at index ${index}.`,
      });
      continue;
    }

    if (annotation.type === 'reference-line') {
      if (
        (annotation.channel !== 'x' && annotation.channel !== 'y') ||
        !isValidValue(annotation.value) ||
        !hasValidOptionalLabel(annotation.label)
      ) {
        diagnostics.push({
          code: 'INVALID_ANNOTATION_VALUE',
          message: `Invalid reference line at index ${index}.`,
        });
        continue;
      }

      normalized.push(annotation as unknown as Annotation);
      continue;
    }

    if (annotation.type === 'reference-band') {
      if (annotation.channel !== 'x' && annotation.channel !== 'y') {
        diagnostics.push({
          code: 'INVALID_ANNOTATION_RANGE',
          message: `Invalid reference band at index ${index}.`,
        });
        continue;
      }

      const validValues =
        isValidValue(annotation.from) &&
        isValidValue(annotation.to) &&
        hasValidOptionalLabel(annotation.label);
      const matchingTypes = typeof annotation.from === typeof annotation.to;
      const validNumericRange =
        typeof annotation.from !== 'number' || annotation.from < (annotation.to as number);
      const validStringRange =
        typeof annotation.from !== 'string' || annotation.from !== annotation.to;

      if (!validValues || !matchingTypes || !validNumericRange || !validStringRange) {
        diagnostics.push({
          code: 'INVALID_ANNOTATION_RANGE',
          message: `Invalid reference band at index ${index}.`,
        });
        continue;
      }

      normalized.push(annotation as unknown as Annotation);
      continue;
    }

    if (!isValidTarget(annotation.target)) {
      diagnostics.push({
        code: 'INVALID_ANNOTATION_TARGET',
        message: `Invalid annotation target at index ${index}.`,
      });
      continue;
    }

    if (
      annotation.type === 'callout' &&
      (typeof annotation.label !== 'string' || !annotation.label.trim())
    ) {
      diagnostics.push({
        code: 'INVALID_ANNOTATION_VALUE',
        message: `Callout label is required at index ${index}.`,
      });
      continue;
    }

    normalized.push(annotation as unknown as Annotation);
  }

  return { annotations: normalized, diagnostics };
};
