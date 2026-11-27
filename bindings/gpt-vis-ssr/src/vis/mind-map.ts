import { createGraph, G6 } from '@antv/g6-ssr';
import { type MindMapProps } from '@antv/gpt-vis/dist/esm/MindMap';
import type { CanvasRenderingContext2D } from 'canvas';
import { createCanvas } from 'canvas';
import { G6THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { MindmapNode } from '../util';
import { CommonOptions } from './types';

const { register, idOf, positionOf, ExtensionCategory, treeToGraphData: treeToGraphDataG6 } = G6;
register(ExtensionCategory.NODE, 'mindmap', MindmapNode);
// max width of node to display 10 words with font size 12
const MAX_WIDTH = 160;

type MindMapStyle = {
  texture?: 'rough' | 'default';
};

export type MindMapOptions = CommonOptions &
  MindMapProps & {
    style?: MindMapStyle;
  };

let canvas: ReturnType<typeof createCanvas> | null = null;
let ctx: CanvasRenderingContext2D | null = null;

type TextStyle = {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
};

const measureRawText = (style: TextStyle): number => {
  if (!canvas) {
    canvas = createCanvas(0, 0);
    ctx = canvas.getContext('2d');
  }

  const font = [
    style.fontStyle || 'normal',
    style.fontWeight || 'normal',
    `${style.fontSize || 12}px`,
    style.fontFamily || 'sans-serif',
  ].join(' ');

  ctx!.font = font;
  return ctx!.measureText(style.text).width;
};

const measureText = (style: TextStyle): number => {
  return Math.min(measureRawText(style), MAX_WIDTH);
};

const splitTokenByWidth = (token: string, maxWidth: number, style: TextStyle): string[] => {
  const chunks: string[] = [];
  let current = '';

  for (const char of Array.from(token)) {
    const next = current + char;
    if (current && measureRawText({ ...style, text: next }) > maxWidth) {
      chunks.push(current);
      current = char;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks;
};

/**
 * Greedy word wrapping. Latin words are kept together when possible, CJK
 * characters may break anywhere, and an over-long token is split by
 * character so that no text is lost.
 */
const wrapText = (text: string, maxWidth: number, style: TextStyle): string[] => {
  const width = Math.max(1, maxWidth);
  const tokens = text.match(/[A-Za-z0-9]+(?:['’._@/-][A-Za-z0-9]+)*|[^\S\n]+|\n|[\s\S]/g) ?? [];
  const lines: string[] = [];
  let line = '';
  let pendingSpace = false;

  const pushLine = () => {
    lines.push(line.trimEnd());
    line = '';
    pendingSpace = false;
  };

  const startLine = (token: string) => {
    if (measureRawText({ ...style, text: token }) <= width) {
      line = token;
      return;
    }

    const chunks = splitTokenByWidth(token, width, style);
    lines.push(...chunks.slice(0, -1));
    line = chunks[chunks.length - 1] || '';
  };

  for (const token of tokens) {
    if (token === '\n') {
      pushLine();
      continue;
    }

    if (/^\s+$/.test(token)) {
      if (line) pendingSpace = true;
      continue;
    }

    if (!line) {
      startLine(token);
      continue;
    }

    const separator = pendingSpace ? ' ' : '';
    const candidate = line + separator + token;
    if (measureRawText({ ...style, text: candidate }) <= width) {
      line = candidate;
      pendingSpace = false;
    } else {
      pushLine();
      startLine(token);
    }
  }

  pushLine();
  return lines.length ? lines : [''];
};

const RootNodeStyle = {
  fill: '#EFF0F0',
  labelFill: '#262626',
  labelFontSize: 24,
  labelFontWeight: 600,
  labelOffsetY: 8,
  labelPlacement: 'center',
  ports: [{ placement: 'right' }, { placement: 'left' }],
  radius: 8,
};

const NodeStyle = {
  fill: 'transparent',
  labelPlacement: 'center',
  labelFontSize: 16,
  ports: [{ placement: 'right-bottom' }, { placement: 'left-bottom' }],
};

const getNodeWidth = (nodeId: any, isRoot: boolean) => {
  const padding = isRoot ? 40 : 30;
  const nodeStyle = isRoot ? RootNodeStyle : NodeStyle;
  return (
    measureText({ text: nodeId, fontSize: nodeStyle.labelFontSize, fontFamily: 'Gill Sans' }) +
    padding
  );
};

const ROOT_NODE_HEIGHT = 36;
const NODE_HEIGHT = 32;
const ROOT_LINE_HEIGHT = 34;
const NODE_LINE_HEIGHT = 22;
const SINGLE_LINE_LAYOUT_HEIGHT = 30;

type NodeMetrics = {
  lines: string[];
  lineHeight: number;
  height: number;
};

const getNodeMetrics = (
  nodeId: string,
  isRoot: boolean,
  cache: Map<string, NodeMetrics>,
): NodeMetrics => {
  const key = `${isRoot ? 'root' : 'node'}:${nodeId}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const fontSize = isRoot ? 24 : 16;
  const lineHeight = isRoot ? ROOT_LINE_HEIGHT : NODE_LINE_HEIGHT;
  const lines = wrapText(String(nodeId), MAX_WIDTH + 20, {
    text: '',
    fontSize,
    fontFamily: 'Gill Sans',
  });
  const height =
    lines.length === 1
      ? isRoot
        ? ROOT_NODE_HEIGHT
        : NODE_HEIGHT
      : lines.length * lineHeight + (isRoot ? 12 : 10);

  const metrics = { lines, lineHeight, height };
  cache.set(key, metrics);
  return metrics;
};

const getNodeSide = (nodeData: any, parentData: any) => {
  if (!parentData) return 'center';

  const nodePositionX = positionOf(nodeData)[0];
  const parentPositionX = positionOf(parentData)[0];
  return parentPositionX > nodePositionX ? 'left' : 'right';
};

/**
 * Converts a tree structure to a graph data format suitable for G6 visualization.
 * The function transforms each node in the tree to a graph node and each parent-child relationship to a graph edge.
 * @param data
 * @returns
 */
export function treeToGraphData(data: any) {
  return treeToGraphDataG6(data, {
    getNodeData: (datum: any, depth: any) => {
      datum.id = datum.name;
      datum.depth = depth;
      if (!datum.children) return datum;
      const { children, ...restDatum } = datum;
      return {
        ...restDatum,
        children: children.map((child: any) => child.name),
      };
    },
    getEdgeData: (source, target) => ({
      source: source.name,
      target: target.name,
    }),
  });
}

export async function MindMap(options: MindMapOptions) {
  const { data, width = 600, height = 400, theme = 'default', renderPlugins, style = {} } = options;
  const { texture = 'default' } = style;

  const dataParse = treeToGraphData(data);
  const rootId = data.name;
  const nodeMetricsCache = new Map<string, NodeMetrics>();

  return await createGraph({
    waitForRender: 300,
    width,
    height,
    data: dataParse,
    devicePixelRatio: 3,
    padding: 24,
    autoFit: {
      type: 'view',
    },
    node: {
      type: 'mindmap',
      // @ts-ignore
      style: function (d) {
        const direction = getNodeSide(d, this.getParentData(idOf(d), 'tree'));
        const id = String(idOf(d));
        const isRoot = id === String(rootId);
        const depth = d.depth;
        const metrics = getNodeMetrics(id, isRoot, nodeMetricsCache);

        return {
          direction,
          labelText: metrics.lines.join('\n'),
          size: [getNodeWidth(id, isRoot), metrics.height],
          labelFontFamily: 'Gill Sans',
          lineWidth: texture === 'rough' ? 0.5 : 2,
          radius: 8,
          stroke: depth === 0 ? '#f1f4f5' : d.style?.color,
          labelBackground: true,
          labelBackgroundFill: 'transparent',
          labelPadding: direction === 'left' ? [2, 0, 10, 40] : [2, 40, 10, 0],
          ...(isRoot ? RootNodeStyle : NodeStyle),
          fill: depth === 0 ? '#f1f4f5' : depth === 1 ? d.style?.color : 'transparent',
          labelFill:
            texture === 'rough'
              ? '#262626'
              : depth === 0
                ? '#262626'
                : depth === 1
                  ? '#FFF'
                  : d.style?.color,
          ports: [{ placement: 'left' }, { placement: 'right' }],
          labelMaxWidth: MAX_WIDTH + 20,
          labelTextOverflow: 'clip',
          labelWordWrap: false,
          labelMaxLines: metrics.lines.length,
          ...(metrics.lines.length > 1
            ? {
                labelLineHeight: metrics.lineHeight,
                ...(isRoot ? { labelOffsetY: 0 } : {}),
              }
            : {}),
          ...(texture === 'rough' ? { labelFontFamily: FontFamily.ROUGH } : {}),
        };
      },
    },
    edge: {
      type: 'cubic-horizontal',
      style: {
        lineWidth: 1.5,
        // @ts-ignore
        stroke: function (data: any) {
          // @ts-ignore
          return this.getNodeData(data.target).depth > 1
            ? // @ts-ignore
              this.getNodeData(data.target).style.color
            : '#99ADD1';
        },
        ...(texture === 'rough' ? { labelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    layout: {
      type: 'mindmap',
      direction: 'H',
      getHeight: (node: any) => {
        const id = String(node.id ?? node.name);
        const isRoot = id === String(rootId);
        const metrics = getNodeMetrics(id, isRoot, nodeMetricsCache);
        return metrics.lines.length === 1
          ? SINGLE_LINE_LAYOUT_HEIGHT
          : metrics.height - (isRoot ? 6 : 2);
      },
      getWidth: (node: any) => getNodeWidth(node.id, node.id === rootId),
      getVGap: () => 14,
      getHGap: () => 64,
      animation: false,
    },
    transforms: [G6THEME_MAP[theme]],
    animation: false,
    renderPlugins,
  });
}
