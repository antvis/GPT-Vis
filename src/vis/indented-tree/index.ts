import {
  ExtensionCategory,
  Graph,
  IndentedLayout,
  Polyline,
  Rect,
  register,
  subStyleProps,
  treeToGraphData,
} from '@antv/g6';
import { getTextStyleByPlacement } from '@antv/g6/esm/utils/element';
import { getWordWrapWidthByBox } from '@antv/g6/esm/utils/text';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor } from '../../util/theme';

/** 与 buildG6TreeData 根 id 一致，供节点内判断。 */
const ROOT_ID = '0';

/**
 * 与 G6 官方 indented-tree 相同：label 需经 getTextStyleByPlacement(keyBounds, …) 相对 key 定位；
 * 仅 subStyleProps 会整体偏右、偏下（缺变换）。
 * @see https://github.com/antvis/G6/blob/v5/packages/site/examples/scene-case/tree-graph/demo/indented-tree.js
 */
class GptVisIndentedTreeNode extends Rect {
  getLabelStyle(attributes: any): any {
    if (attributes.label === false || !attributes.labelText) return false;
    const labelSub = subStyleProps(this.getGraphicStyle(attributes), 'label') as Record<
      string,
      any
    >;
    const { placement: p0, maxWidth, offsetX: ox0, offsetY: oy0, ...labelRest } = labelSub;
    const isRoot = String(this.id) === ROOT_ID;
    const placement = p0 ?? (isRoot ? 'center' : 'top-left');
    /** 用户反馈略偏右、偏下：在 top-left/center 锚点基础上微移（canvas y 向下为正，向左为负 x）。 */
    const offsetX = ox0 ?? (isRoot ? -6 : -3);
    const offsetY = oy0 ?? (isRoot ? -4 : -3);
    const keyBounds = this.getShape('key').getLocalBounds();
    return Object.assign(
      getTextStyleByPlacement(keyBounds, placement, offsetX, offsetY),
      { wordWrapWidth: getWordWrapWidthByBox(keyBounds, maxWidth) },
      labelRest,
    );
  }
}

/** 官方 IndentedEdge：单拐点 [sx,ty]，正交 L 形；勿用 orth router（会穿盒心/穿字）。 */
class GptVisIndentedTreeEdge extends Polyline {
  getControlPoints(attributes: any) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);
    const [sx] = sourcePoint;
    const [, ty] = targetPoint;
    return [[sx, ty]] as ReturnType<Polyline['getControlPoints']>;
  }
}

const GPT_VIS_INDENTED_TREE_NODE = 'gpt-vis-indented-tree-node';
const GPT_VIS_INDENTED_TREE_EDGE = 'gpt-vis-indented-tree-edge';
let gptVisIndentedTreeExtensionsRegistered = false;

function ensureGptVisIndentedTreeExtensionsRegistered(): void {
  if (gptVisIndentedTreeExtensionsRegistered) return;
  register(ExtensionCategory.NODE, GPT_VIS_INDENTED_TREE_NODE, GptVisIndentedTreeNode as any);
  register(ExtensionCategory.EDGE, GPT_VIS_INDENTED_TREE_EDGE, GptVisIndentedTreeEdge as any);
  gptVisIndentedTreeExtensionsRegistered = true;
}

/** @antv/hierarchy indented 输出的是包围盒左上角；G6 节点 translate 对应图形中心，需换算否则缩进错位、边穿过文字。 */
let gptVisIndentedLayoutRegistered = false;

function hierarchyTopLeftToCenter(root: any): void {
  const visit = (node: any) => {
    if (node == null) return;
    const w = Number(node.width);
    const h = Number(node.height);
    if (Number.isFinite(node.x) && Number.isFinite(w) && w > 0) node.x += w / 2;
    if (Number.isFinite(node.y) && Number.isFinite(h) && h > 0) node.y += h / 2;
    const ch = node.children;
    if (Array.isArray(ch)) for (const c of ch) visit(c);
  };
  visit(root);
}

function ensureGptVisIndentedLayoutRegistered(): void {
  if (gptVisIndentedLayoutRegistered) return;
  // 覆盖内置 `indented`（仍为树布局函数），保持 isTreeLayout('indented') 为真；类型声明按 class，与 hierarchy 导出不一致。
  register(ExtensionCategory.LAYOUT, 'indented', ((root: any, options: any) => {
    const result = IndentedLayout(root, options);
    hierarchyTopLeftToCenter(result);
    return result;
  }) as any);
  gptVisIndentedLayoutRegistered = true;
}

// ---------------------------------------------------------------------------
// Text measurement — Canvas 2D for accuracy, CJK-aware fallback for SSR.
// ---------------------------------------------------------------------------
let _measureCanvas: HTMLCanvasElement | null = null;
let _measureCtx: CanvasRenderingContext2D | null = null;

function measureTextWidth(text: string, fontSize = 12): number {
  if (!text) return 0;
  if (typeof document === 'undefined' || typeof HTMLCanvasElement === 'undefined') {
    let w = 0;
    for (const ch of text) {
      w += ch.charCodeAt(0) > 0x4e00 ? fontSize : fontSize * 0.6;
    }
    return w;
  }
  if (!_measureCanvas) {
    _measureCanvas = document.createElement('canvas');
    _measureCtx = _measureCanvas.getContext('2d');
  }
  if (!_measureCtx) return text.length * fontSize * 0.6;
  _measureCtx.font = `${fontSize}px system-ui,-apple-system,BlinkMacSystemFont,sans-serif`;
  return _measureCtx.measureText(text).width;
}

/**
 * Hierarchy / treeLayout passes graphlib nodes: `{ id, data: NodeData }`.
 * `@antv/hierarchy` calls `getChildren(c.data)` and replaces `c.children` with that list — if `data` has no
 * nested `children`, the subtree is wiped and only the root is laid out (overlapping / “missing” nodes).
 *
 * `getWidth` receives the same shapes as `HierarchyNode.data`: often `{ id, labelText, children? }` after
 * we attach nested children below.
 */
function getHierarchyNodeLabelText(d: any): string {
  if (d == null) return '';
  const inner =
    d?.data != null && typeof d.data === 'object' && !Array.isArray(d.data) ? d.data : d;
  const t =
    inner?.style?.labelText ??
    inner?.data?.labelText ??
    inner?.labelText ??
    (typeof inner?.name === 'string' ? inner.name : undefined);
  if (t != null && String(t).length > 0) return String(t);
  const id = d?.id ?? inner?.id;
  return id != null ? String(id) : '';
}

/**
 * Build nested `children` under each node's `data` so @antv/hierarchy indented layout's default
 * `getChildren(d => d.children)` sees the tree (G6 graphlib only had `children` on the outer node).
 */
function attachIndentedHierarchyChildren(nodes: any[]): void {
  const byId = new Map<string, any>(nodes.map((n) => [String(n.id), n]));

  const hierarchyPayload = (id: string): Record<string, any> => {
    const n = byId.get(id);
    if (!n) return { id, labelText: id, collapsed: false };
    const childIds = Array.isArray(n.children) ? n.children.map(String) : [];
    const labelText = getHierarchyNodeLabelText({ id: n.id, data: n.data, style: n.style });
    const out: Record<string, any> = { id: String(n.id), labelText, collapsed: false };
    if (childIds.length > 0) {
      out.children = childIds.map((cid: string) => hierarchyPayload(cid));
    }
    return out;
  };

  for (const n of nodes) {
    const childIds = Array.isArray(n.children) ? n.children.map(String) : [];
    const nested =
      childIds.length > 0 ? childIds.map((cid: string) => hierarchyPayload(cid)) : undefined;
    n.data = {
      ...n.data,
      collapsed: false,
      ...(nested ? { children: nested } : {}),
    };
  }
}

/**
 * Indented tree node data — only name + optional children, no description.
 * Aligns with the official G6 indented tree example data structure.
 */
export interface IndentedTreeData {
  name: string;
  children?: IndentedTreeData[];
}

/**
 * IndentedTreeConfig defines the configuration for rendering the indented tree.
 */
export interface IndentedTreeConfig {
  type?: 'indented-tree';
  data: IndentedTreeData;
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  /** Layout direction: 'LR' = root left (default), 'RL' = root right, 'H' = root center */
  direction?: 'LR' | 'RL' | 'H';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * IndentedTreeInstance represents a chart instance with render and destroy methods.
 */
export interface IndentedTreeInstance {
  render: (config: IndentedTreeConfig) => void;
  destroy: () => void;
}

/** 与 G6 官方 indented-tree demo 一致（getHeight: 20）。 */
const NODE_HEIGHT = 20;

/** 与官方 demo 一致：按深度着色子树连线。 */
const FALLBACK_COLORS = [
  '#5B8FF9',
  '#F6BD16',
  '#5AD8A6',
  '#945FB9',
  '#E86452',
  '#6DC8EC',
  '#FF99C3',
  '#1E9493',
  '#FF9845',
  '#5D7092',
];

/**
 * Convert our tree data (name/children) to G6 format.
 * Path-based IDs ('0', '0-0', '0-0-1', …) prevent collisions when
 * sibling nodes share the same name.
 */
function buildG6TreeData(node: IndentedTreeData, pathId: string): Record<string, any> {
  const result: Record<string, any> = {
    id: pathId,
    data: { labelText: node.name, collapsed: false },
    style: { labelText: node.name, collapsed: false },
  };
  if (node.children?.length) {
    result.children = node.children.map((child, idx) => buildG6TreeData(child, `${pathId}-${idx}`));
  }
  return result;
}

/**
 * IndentedTree — G6 5 indented layout for static DSL trees (no collapse/add UI).
 * Uses built-in `rect` nodes and `line` edges. Tree edges must have explicit ids (see render) to avoid
 * colliding with path-based node ids under G6's default `${source}-${target}` edge id rule.
 * Based on: https://g6.antv.antgroup.com/examples/scene-case/tree-graph#indented-tree
 */
export const IndentedTree = (options: VisualizationOptions): IndentedTreeInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let graph: Graph | null = null;

  const render = (config: IndentedTreeConfig): void => {
    const { data, theme = chartTheme, title, style = {}, direction = 'LR' } = config;

    if (!data?.name) {
      throw new Error('IndentedTree: data with a name field is required');
    }

    if (graph) {
      graph.destroy();
      graph = null;
    }

    const containerEl =
      typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;

    if (!containerEl) throw new Error('IndentedTree: container element not found');

    containerEl.innerHTML = '';

    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const isDark = theme === 'dark';

    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'gpt-vis-indented-tree-title';
      titleEl.style.cssText = `
        padding: 8px 12px 4px;
        font-size: 14px;
        font-weight: 600;
        color: ${isDark ? '#e0e0e0' : '#333'};
        background: ${backgroundColor};
      `;
      titleEl.textContent = title;
      containerEl.appendChild(titleEl);
    }

    const titleEl = containerEl.querySelector('.gpt-vis-indented-tree-title') as HTMLElement | null;
    const titleHeight = titleEl ? titleEl.offsetHeight : 0;
    const parentHeight = containerEl.offsetHeight;
    const rawHeight =
      parentHeight > titleHeight ? parentHeight - titleHeight : (height || 400) - titleHeight;
    const graphHeight = Math.max(rawHeight, 0);
    const graphWidth = containerEl.offsetWidth || width || 600;

    const graphContainer = document.createElement('div');
    graphContainer.style.cssText = `
      width: 100%;
      height: ${graphHeight}px;
      background: ${backgroundColor};
      border-radius: 4px;
      overflow: hidden;
    `;
    containerEl.appendChild(graphContainer);

    const g6TreeData = buildG6TreeData(data, '0');
    const flatGraphData = treeToGraphData(g6TreeData as any);
    /**
     * G6 defaults edge id to `${source}-${target}`. Path node ids like `0` + `0-0` become `0-0-0`, which
     * collides with an actual child node `0-0-0` — the edge then overwrites the node in `elementMap`,
     * and Line endpoints call `getPorts` on a non-node → "getPorts is not a function".
     */
    for (const e of flatGraphData.edges || []) {
      const edge = e as { id?: string; source: string; target: string };
      edge.id = `edge:${edge.source}->${edge.target}`;
    }
    for (const n of flatGraphData.nodes || []) {
      const node = n as any;
      node.style = { ...node.style, collapsed: false };
      node.data = { ...node.data, collapsed: false };
    }
    attachIndentedHierarchyChildren(flatGraphData.nodes || []);

    const getNodeText = (d: any) =>
      (d.style?.labelText as string) || (d.data?.labelText as string) || d.id;

    /** 官方 demo：measureText + 6；每行宽度随文案，竖脊与缩进对齐。 */
    const labelPadX = 6;

    /**
     * 官方 IndentedNode：out=left-bottom，in=right-bottom（折线终点在行右下角，配合 label baseline=top，线走文字下方）。
     */
    const portParentOut = direction === 'RL' ? 'right-bottom' : 'left-bottom';
    const portChildIn = direction === 'RL' ? 'left-bottom' : 'right-bottom';

    const palette = style.palette?.length ? style.palette : FALLBACK_COLORS;

    ensureGptVisIndentedTreeExtensionsRegistered();
    ensureGptVisIndentedLayoutRegistered();

    graph = new Graph({
      container: graphContainer,
      width: graphWidth,
      height: graphHeight,
      /** Indented trees extend horizontally; without fitView, deep nodes render outside the viewport (looks like missing nodes). */
      autoFit: 'view',
      /** 避免 autoFit 在“树很小”时把画面放大到文字粗大。 */
      zoomRange: [0.2, 1],
      padding: 20,
      data: flatGraphData,
      node: {
        type: GPT_VIS_INDENTED_TREE_NODE,
        style: {
          collapsed: false,
          icon: false,
          badge: false,
          port: true,
          ports: [
            { key: 'out', placement: portParentOut as 'left-bottom' | 'right-bottom', r: 0 },
            { key: 'in', placement: portChildIn as 'left-bottom' | 'right-bottom', r: 0 },
          ],
          labelIsBillboard: false,
          labelPlacement: (d: any) => (d.id === ROOT_ID ? 'center' : 'top-left'),
          labelOffsetX: (d: any) => (d.id === ROOT_ID ? -6 : -3),
          labelOffsetY: (d: any) => (d.id === ROOT_ID ? -4 : -3),
          labelText: (d: any) => getNodeText(d),
          labelTextAlign: (d: any) => (d.id === ROOT_ID ? 'center' : 'left'),
          labelTextBaseline: 'top',
          labelFontSize: 12,
          labelFontWeight: 400,
          size: (d: any) => [
            Math.max(32, measureTextWidth(getNodeText(d), 12) + labelPadX),
            NODE_HEIGHT,
          ],
          labelBackground: (d: any) => d.id === ROOT_ID,
          labelBackgroundRadius: 0,
          labelBackgroundFill: '#576286',
          labelFill: (d: any) => {
            if (d.id === ROOT_ID) return '#fff';
            return isDark ? '#d0d0d0' : '#666';
          },
          fill: 'transparent',
          lineWidth: 0,
          stroke: undefined,
        } as any,
      },
      edge: {
        type: GPT_VIS_INDENTED_TREE_EDGE,
        style: {
          halo: false,
          badge: false,
          label: false,
          sourcePort: 'out',
          targetPort: 'in',
          radius: 16,
          lineWidth: 2,
          stroke: (datum: any) => {
            try {
              if (datum?.source == null) return palette[0];
              const depth = graph!.getAncestorsData(datum.source, 'tree').length;
              return palette[depth % palette.length] ?? palette[0];
            } catch {
              return palette[0];
            }
          },
        } as any,
      },
      layout: {
        type: 'indented',
        direction,
        isHorizontal: true,
        indent: 40,
        /** 与下方 node.style.size 一致；hierarchy 默认 getHGap/getVGap 为 18，会放大布局盒，中心换算后连接桩与 rect 错位。 */
        getHGap: () => 0,
        // 官方 demo 为 10；否则行距太紧（你截图里就是“挤”）。
        getVGap: () => 10,
        getHeight: () => NODE_HEIGHT,
        getWidth: (d: any) =>
          Math.max(32, measureTextWidth(getHierarchyNodeLabelText(d), 12) + labelPadX),
      },
      behaviors: ['scroll-canvas', 'zoom-canvas'],
    });

    graph.render();
  };

  const destroy = (): void => {
    if (graph) {
      graph.destroy();
      graph = null;
    }
  };

  return { render, destroy };
};
