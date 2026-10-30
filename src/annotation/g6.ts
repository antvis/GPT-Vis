import type { BaseEdge, BaseNode, Graph } from '@antv/g6';
import type { GraphData, ThemeTokens } from '../types';
import type { Annotation, AnnotationLabel } from '../types/annotation';
import { cardAttachment, inflate, placeLabel, type Box, type Point, type Segment } from './layout';
import { annotationError, matchData } from './shared';

/** Native graph styles; original node/edge labels remain intact. */
export function getNetworkAnnotations(
  data: GraphData,
  annotations: Annotation[],
  colors: {
    accent: string;
    background: string;
    tokens: ThemeTokens;
    label: NonNullable<AnnotationLabel['style']> & { fontFamily?: string };
  },
) {
  const t = colors.tokens;
  const nodes: Record<string, any>[] = data.nodes.map(() => ({}));
  const edges: Record<string, any>[] = data.edges.map(() => ({}));
  const source = [...data.nodes, ...data.edges];

  for (const annotation of annotations) {
    if (annotation.type !== 'highlight' && annotation.type !== 'point') {
      annotationError(annotation, 'network-graph supports highlight and point only.');
    }
    if (annotation.type === 'highlight' && annotation.fields !== undefined) {
      annotationError(annotation, 'network-graph does not support field-level highlight.');
    }
    const references = annotation.type === 'highlight' ? annotation.data : [annotation.data];
    if (!references?.length) annotationError(annotation, 'highlight requires data.');
    const matched = references.flatMap((reference) => {
      const indices = matchData(source, reference, annotation);
      if (
        indices.some((index) => index < nodes.length) &&
        indices.some((index) => index >= nodes.length)
      ) {
        annotationError(
          annotation,
          'reference matches both nodes and edges; use more specific fields.',
        );
      }
      return indices;
    });
    const indices = Array.from(new Set(matched));
    if (annotation.type === 'point' && indices.length !== 1) {
      annotationError(annotation, 'point requires exactly one node or edge.');
    }

    for (const index of indices) {
      const isNode = index < nodes.length;
      const style = isNode ? nodes[index] : edges[index - nodes.length];
      const accent = annotation.style?.stroke ?? style.stroke ?? colors.accent;
      Object.assign(style, {
        halo: true,
        haloStroke: accent,
        haloLineWidth: isNode ? 12 : 7,
        haloStrokeOpacity: isNode ? 0.18 : 0.1,
        haloFillOpacity: 0,
        stroke: accent,
        lineWidth: style.lineWidth ?? t.lineWidth ?? (isNode ? 3.5 : 2.5),
        ...annotation.style,
      });
      if (!annotation.label) continue;
      const label = {
        text: annotation.label.text,
        ...colors.label,
        fontSize: colors.label.fontSize ?? 12,
        fontWeight: colors.label.fontWeight ?? 500,
        lineHeight: t.lineHeight,
        padding: [t.spacingSmall ?? 7, t.spacingMedium ?? 10],
        wordWrap: true,
        wordWrapWidth: 156,
        maxLines: 8,
        background: true,
        backgroundFill: t.colorSurface ?? colors.background,
        backgroundStroke: t.colorStroke ?? accent,
        backgroundLineWidth: t.lineWidth ?? 1,
        backgroundOpacity: 1,
        backgroundRadius: t.radius ?? 5,
        ...annotation.label.style,
      };
      if (isNode) {
        style.badge = true;
        const badges = style.badges ?? [];
        style.badges = [
          ...badges,
          { ...label, placement: 'right', offsetX: 30, offsetY: -badges.length * 38 },
        ];
      } else {
        // G6 edges have one badge; combine multiple explanations instead of replacing the edge name.
        const text = style.badgeText ? `${style.badgeText}\n${label.text}` : label.text;
        Object.assign(
          style,
          Object.fromEntries(
            Object.entries({ ...label, text }).map(([key, value]) => [
              `badge${key[0].toUpperCase()}${key.slice(1)}`,
              value,
            ]),
          ),
          { badge: true, badgePlacement: 'suffix', badgeOffsetY: -12 },
        );
      }
    }
  }
  return { nodes, edges };
}

/** Reflow native badges once positions exist, and when nodes move. Leaders stay in the canvas export. */
export function bindNetworkAnnotationLayout(
  graph: Graph,
  annotations: ReturnType<typeof getNetworkAnnotations>,
): () => void {
  if (
    !annotations.nodes.some((style) => style.badges?.length) &&
    !annotations.edges.some((style) => style.badgeText)
  )
    return () => {};
  const layout = () => {
    const canvas = graph.getCanvas();
    const sourceNodes = graph.getNodeData();
    const sourceEdges = graph.getEdgeData();
    const occupied: Box[] = [];
    const segments: Segment[] = [];
    const nodePositions = new Map<string, Point>();
    const addBounds = (shape?: ReturnType<BaseNode['getShape']>) => {
      if (!shape) return;
      const { min, max } = shape.getBounds();
      occupied.push(
        inflate({ x: min[0], y: min[1], width: max[0] - min[0], height: max[1] - min[1] }, 6),
      );
    };
    for (const node of sourceNodes) {
      const element = canvas.document.getElementById(node.id) as unknown as BaseNode | null;
      if (!element) continue;
      const position = graph.getElementPosition(node.id);
      nodePositions.set(node.id, [position[0], position[1]]);
      addBounds(element.getShape('key'));
      addBounds(element.getShape('label'));
    }
    for (const edge of sourceEdges) {
      const from = nodePositions.get(edge.source);
      const to = nodePositions.get(edge.target);
      if (from && to) segments.push([from, to]);
      const element = canvas.document.getElementById(edge.id!) as unknown as BaseEdge | null;
      if (element) addBounds(element.getShape('label'));
    }
    if (!nodePositions.size) return;
    const positions = [...nodePositions.values()];
    const xs = positions.map(([x]) => x);
    const ys = positions.map(([, y]) => y);
    // Auto-fit runs after layout and includes native badges, so annotations may use nearby whitespace.
    const bounds = {
      x: Math.min(...xs) - 190,
      y: Math.min(...ys) - 100,
      width: Math.max(...xs) - Math.min(...xs) + 380,
      height: Math.max(...ys) - Math.min(...ys) + 200,
    };
    const arrange = (
      element: BaseNode | BaseEdge,
      badgeName: string,
      anchor: Point,
      origin: Point,
      color: string,
      index: number,
    ) => {
      const badge = element.getShape(badgeName);
      if (!badge) return;
      // Native edge badges inherit the edge angle; explanatory text stays horizontal.
      badge.setEulerAngles(0);
      const { min, max } = badge.getBounds();
      const box = placeLabel(
        anchor,
        { width: max[0] - min[0], height: max[1] - min[1] },
        bounds,
        occupied,
        segments,
      );
      badge.translate([box.x - min[0], box.y - min[1]]);
      occupied.push(inflate(box, 6));
      const end = cardAttachment(anchor, box);
      const dx = end[0] - anchor[0];
      const dy = end[1] - anchor[1];
      const distance = Math.hypot(dx, dy) || 1;
      const start = [anchor[0] + (dx / distance) * 20, anchor[1] + (dy / distance) * 20];
      const id = `gpt-vis-leader-${index}`;
      let leader = element.getElementById(id) as unknown as ReturnType<BaseNode['getShape']> | null;
      if (!leader) {
        const created = canvas.document.createElement('path', {
          id,
          style: { pointerEvents: 'none', zIndex: 2 },
        });
        element.appendChild(created);
        leader = created as unknown as ReturnType<BaseNode['getShape']>;
      }
      leader.attr({
        d: `M${start[0] - origin[0]},${start[1] - origin[1]} L${end[0] - origin[0]},${end[1] - origin[1]}`,
        stroke: color,
        lineWidth: badge.attr('backgroundLineWidth') ?? 1,
        strokeOpacity: 0.65,
        fill: 'none',
      });
    };
    sourceNodes.forEach((node, index) => {
      const style = annotations.nodes[index];
      if (!style?.badges?.length) return;
      const element = canvas.document.getElementById(node.id) as unknown as BaseNode | null;
      const anchor = nodePositions.get(node.id);
      if (!element || !anchor) return;
      style.badges.forEach((badge: Record<string, any>, badgeIndex: number) => {
        arrange(element, `badge-${badgeIndex}`, anchor, anchor, badge.backgroundStroke, badgeIndex);
      });
    });
    sourceEdges.forEach((edge, index) => {
      const style = annotations.edges[index];
      if (!style?.badgeText) return;
      const element = canvas.document.getElementById(edge.id!) as unknown as BaseEdge | null;
      const from = nodePositions.get(edge.source);
      const to = nodePositions.get(edge.target);
      if (element && from && to)
        arrange(
          element,
          'badge',
          [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2],
          [0, 0],
          style.badgeBackgroundStroke,
          0,
        );
    });
  };
  const events = ['afterlayout', 'afterrender', 'afterdraw', 'afterelementtranslate'];
  events.forEach((event) => graph.on(event, layout));
  return () => events.forEach((event) => graph.off(event, layout));
}
