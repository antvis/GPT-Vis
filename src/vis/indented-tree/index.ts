import {
  Badge,
  BaseBehavior,
  BaseNode,
  CommonEvent,
  ExtensionCategory,
  Graph,
  NodeEvent,
  Polyline,
  iconfont,
  register,
  subStyleProps,
  treeToGraphData,
} from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, normalizePalette } from '../../util/theme';

// ---------------------------------------------------------------------------
// Official G6 indented-tree implementation (adapted for GPT-Vis)
// https://g6.antv.antgroup.com/examples/scene-case/tree-graph/#indented-tree
// Edge/node accent colors follow the same theme palettes as other GPT-Vis charts
// (see getThemeColors); optional style.palette overrides per render.
// ---------------------------------------------------------------------------

const TreeEvent = {
  COLLAPSE_EXPAND: 'collapse-expand',
  ADD_CHILD: 'add-child',
} as const;

let _iconfontInjected = false;
function ensureIconfontInjected(): void {
  if (_iconfontInjected) return;
  if (typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.innerHTML = `@import url('${iconfont.css}');`;
  document.head.appendChild(style);
  _iconfontInjected = true;
}

let _measureCanvas: HTMLCanvasElement | null = null;
let _measureCtx: CanvasRenderingContext2D | null = null;
function measureTextWidth(text: string, fontSize = 12): number {
  if (!text) return 0;
  if (typeof document === 'undefined' || typeof HTMLCanvasElement === 'undefined') {
    let w = 0;
    for (const ch of text) w += ch.charCodeAt(0) > 0x4e00 ? fontSize : fontSize * 0.6;
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

class IndentedNode extends (BaseNode as any) {
  static defaultStyleProps = {
    ports: [
      { key: 'in', placement: 'right-bottom' },
      { key: 'out', placement: 'left-bottom' },
    ],
  };

  constructor(options: any) {
    Object.assign(options.style, IndentedNode.defaultStyleProps);
    super(options);
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  getKeyStyle(attributes: any) {
    const [width, height] = this.getSize(attributes);
    const keyStyle = super.getKeyStyle(attributes);
    return { width, height, ...keyStyle, fill: 'transparent' };
  }

  drawKeyShape(attributes: any, container: any) {
    const keyStyle = this.getKeyStyle(attributes);
    return this.upsert('key', 'rect', keyStyle, container);
  }

  getLabelStyle(attributes: any): any {
    if (attributes.label === false || !attributes.labelText) return false;
    return subStyleProps(this.getGraphicStyle(attributes), 'label');
  }

  drawIconArea(attributes: any, container: any) {
    const [, h] = this.getSize(attributes);
    const iconAreaStyle = { fill: 'transparent', height: 30, width: 12, x: -6, y: h, zIndex: -1 };
    this.upsert('icon-area', 'rect', iconAreaStyle, container);
  }

  forwardEvent(target: any, type: any, listener: any) {
    if (target && !Reflect.has(target, '__bind__')) {
      Reflect.set(target, '__bind__', true);
      target.addEventListener(type, listener);
    }
  }

  getCountStyle(attributes: any) {
    const { collapsed, color } = attributes;
    if (collapsed) {
      const [, height] = this.getSize(attributes);
      return {
        backgroundFill: color,
        cursor: 'pointer',
        fill: '#fff',
        fontSize: 8,
        padding: [0, 10],
        text: `${this.childrenData.length}`,
        textAlign: 'center',
        y: height + 8,
      };
    }
    return false;
  }

  drawCountShape(attributes: any, container: any) {
    const countStyle = this.getCountStyle(attributes);
    const btn = this.upsert('count', Badge, countStyle as any, container);
    this.forwardEvent(btn, CommonEvent.CLICK, (event: any) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, { id: this.id, collapsed: false });
    });
  }

  isShowCollapse(attributes: any) {
    return !attributes.collapsed && this.childrenData.length > 0;
  }

  getCollapseStyle(attributes: any) {
    const { showIcon, color } = attributes;
    if (!this.isShowCollapse(attributes)) return false;
    const [, height] = this.getSize(attributes);
    return {
      visibility: showIcon ? 'visible' : 'hidden',
      backgroundFill: color,
      backgroundHeight: 12,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: '#fff',
      fontFamily: 'iconfont',
      fontSize: 8,
      text: '\ue6e4',
      textAlign: 'center',
      x: -1,
      y: height + 8,
    };
  }

  drawCollapseShape(attributes: any, container: any) {
    const iconStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse-expand', Badge, iconStyle as any, container);
    this.forwardEvent(btn, CommonEvent.CLICK, (event: any) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: !attributes.collapsed,
      });
    });
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);
    this.drawCountShape(attributes, container);
    this.drawIconArea(attributes, container);
    this.drawCollapseShape(attributes, container);
  }
}

class IndentedEdge extends (Polyline as any) {
  getControlPoints(attributes: any): any {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);
    const [sx] = sourcePoint;
    const [, ty] = targetPoint;
    return [[sx, ty]];
  }
}

class CollapseExpandTree extends BaseBehavior {
  constructor(context: any, options: any) {
    super(context, options);
    this.bindEvents();
  }

  update(options: any) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  bindEvents() {
    const { graph } = this.context;
    graph.on(NodeEvent.POINTER_ENTER, this.showIcon);
    graph.on(NodeEvent.POINTER_LEAVE, this.hideIcon);
    graph.on(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
    graph.on(TreeEvent.ADD_CHILD, this.addChild);
  }

  unbindEvents() {
    const { graph } = this.context;
    graph.off(NodeEvent.POINTER_ENTER, this.showIcon);
    graph.off(NodeEvent.POINTER_LEAVE, this.hideIcon);
    graph.off(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
    graph.off(TreeEvent.ADD_CHILD, this.addChild);
  }

  status = 'idle';

  showIcon = (event: any) => {
    this.setIcon(event, true);
  };

  hideIcon = (event: any) => {
    this.setIcon(event, false);
  };

  setIcon = (event: any, show: boolean) => {
    if (this.status !== 'idle') return;
    const { target } = event;
    const id = target.id;
    const { graph, element } = this.context as any;
    graph.updateNodeData([{ id, style: { showIcon: show } }]);
    element?.draw?.({ animation: false, silence: true });
  };

  onCollapseExpand = async (event: any) => {
    this.status = 'busy';
    const { id, collapsed } = event;
    const { graph } = this.context;
    if (collapsed) await graph.collapseElement(id);
    else await graph.expandElement(id);
    this.status = 'idle';
  };

  // GPT-Vis 版本只保留官方的折叠/展开交互；新增子节点会引入额外数据模型管理，暂不启用。
  addChild = () => {};
}

const GPT_VIS_INDENTED_NODE = 'gpt-vis-indented';
const GPT_VIS_INDENTED_EDGE = 'gpt-vis-indented-edge';
const GPT_VIS_COLLAPSE_BEHAVIOR = 'gpt-vis-collapse-expand-tree';
let _extensionsRegistered = false;
function ensureExtensionsRegistered() {
  if (_extensionsRegistered) return;
  register(ExtensionCategory.NODE, GPT_VIS_INDENTED_NODE, IndentedNode as any);
  register(ExtensionCategory.EDGE, GPT_VIS_INDENTED_EDGE, IndentedEdge as any);
  register(ExtensionCategory.BEHAVIOR, GPT_VIS_COLLAPSE_BEHAVIOR, CollapseExpandTree);
  _extensionsRegistered = true;
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
  zoomTo: (zoom: number) => void;
  getZoom: () => number | undefined;
}

const NODE_HEIGHT = 20;

function toG6TreeData(node: IndentedTreeData): any {
  return {
    id: node.name,
    children: (node.children || []).map(toG6TreeData),
  };
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
    const palette = normalizePalette(style.palette, theme);

    containerEl.style.background = backgroundColor;
    containerEl.style.borderRadius = '4px';
    containerEl.style.overflow = 'hidden';

    ensureIconfontInjected();
    ensureExtensionsRegistered();

    const rootId = data.name;
    const graphData = treeToGraphData(toG6TreeData(data));

    graph = new Graph({
      animation: false,
      container: containerEl,
      x: 60,
      width,
      height,
      autoFit: 'view',
      autoResize: true,
      padding: 20,
      data: graphData,
      node: {
        type: GPT_VIS_INDENTED_NODE,
        style: {
          size: (d: any) => [measureTextWidth(String(d.id ?? ''), 12) + 6, NODE_HEIGHT],
          labelBackground: (datum: any) => datum.id === rootId,
          labelBackgroundRadius: 0,
          labelBackgroundFill: palette[0] ?? '#1783FF',
          labelFill: (datum: any) => (datum.id === rootId ? '#fff' : isDark ? '#d0d0d0' : '#666'),
          labelText: (d: any) => d.style?.labelText || d.id,
          labelTextAlign: (datum: any) => (datum.id === rootId ? 'center' : 'left'),
          labelTextBaseline: 'top',
          color: (datum: any) => {
            try {
              const depth = graph!.getAncestorsData(datum.id, 'tree').length - 1;
              return palette[depth % palette.length] ?? palette[0] ?? '#1783FF';
            } catch {
              return palette[0] ?? '#1783FF';
            }
          },
        } as any,
        state: {
          selected: {
            lineWidth: 0,
            labelFill: '#40A8FF',
            labelBackground: true,
            labelFontWeight: 'normal',
            labelBackgroundFill: '#e8f7ff',
            labelBackgroundRadius: 10,
          },
        } as any,
      },
      edge: {
        type: GPT_VIS_INDENTED_EDGE,
        style: {
          radius: 16,
          lineWidth: 2,
          sourcePort: 'out',
          targetPort: 'in',
          stroke: (datum: any) => {
            try {
              if (datum?.source == null) return palette[0] ?? '#1783FF';
              const depth = graph!.getAncestorsData(datum.source, 'tree').length;
              return palette[depth % palette.length] ?? palette[0] ?? '#1783FF';
            } catch {
              return palette[0] ?? '#1783FF';
            }
          },
        } as any,
      },
      layout: {
        type: 'indented',
        direction,
        isHorizontal: true,
        indent: 40,
        getHeight: () => NODE_HEIGHT,
        getVGap: () => 10,
      },
      behaviors: [
        'drag-canvas',
        GPT_VIS_COLLAPSE_BEHAVIOR,
        {
          type: 'click-select',
          enable: (event: any) => event.targetType === 'node' && event.target.id !== rootId,
        },
      ] as any,
      plugins: title
        ? [{ key: 'title', type: 'title', title, titleFill: isDark ? '#e0e6ed' : '#1a1a2e' }]
        : [],
    });

    graph.render();
  };

  const destroy = (): void => {
    if (graph) {
      graph.destroy();
      graph = null;
    }
  };

  return {
    render,
    destroy,
    zoomTo: (zoom) => graph?.zoomTo(zoom),
    getZoom: () => graph?.getZoom(),
  };
};
