import { Rect, Text } from '@antv/g';
import {
  Badge,
  BaseBehavior,
  BaseNode,
  BaseTransform,
  CommonEvent,
  CubicHorizontal,
  ExtensionCategory,
  Graph,
  GraphEvent,
  idOf,
  NodeEvent,
  positionOf,
  register,
  treeToGraphData,
} from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { G6THEME_MAP } from '../../util/theme';

/**
 * MindMap data type (tree structure)
 */
export type MindMapData = {
  name: string;
  children?: MindMapData[];
};

/**
 * MindMap configuration for rendering
 */
export interface MindMapConfig {
  type?: 'mind-map';
  data: MindMapData;
  theme?: 'default' | 'academy';
}

/**
 * MindMap instance with render and destroy methods
 */
export interface MindMapInstance {
  render: (config: MindMapConfig) => void;
  destroy: () => void;
}

const RootNodeStyle = {
  fill: '#EFF0F0',
  labelFill: '#262626',
  labelFontSize: 24,
  labelFontWeight: 600,
  labelOffsetY: 8,
  labelPlacement: 'center' as const,
  ports: [{ placement: 'right' as const }, { placement: 'left' as const }],
  radius: 8,
};

const NodeStyle = {
  fill: 'transparent',
  labelPlacement: 'center' as const,
  labelFontSize: 16,
  ports: [
    { placement: 'right-bottom' as const },
    { placement: 'left-bottom' as const },
  ],
};

const TreeEvent = {
  COLLAPSE_EXPAND: 'collapse-expand',
};

let textShape: Text | null = null;
const measureText = (text: any) => {
  if (!textShape) textShape = new Text({ style: text });
  textShape.attr(text);
  return textShape.getBBox().width;
};

const getNodeWidth = (nodeId: string, isRoot: boolean) => {
  const padding = isRoot ? 40 : 30;
  const nodeStyle = isRoot ? RootNodeStyle : NodeStyle;
  return (
    measureText({
      text: nodeId,
      fontSize: nodeStyle.labelFontSize,
      fontFamily: 'Gill Sans',
    }) + padding
  );
};

const getNodeSize = (nodeId: string, isRoot: boolean) => {
  const width = getNodeWidth(nodeId, isRoot);
  const height = isRoot ? 48 : 32;
  return [width, height];
};

class MindmapNode extends BaseNode {
  static defaultStyleProps = {
    showIcon: false,
  };

  constructor(options: any) {
    Object.assign(options.style, MindmapNode.defaultStyleProps);
    super(options);
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  get rootId() {
    return idOf(this.context.model.getRootsData()[0]);
  }

  isShowCollapse(attributes: any) {
    const { collapsed, showIcon } = attributes;
    return !collapsed && showIcon && this.childrenData.length > 0;
  }

  getCollapseStyle(attributes: any) {
    const { showIcon, color, direction } = attributes;
    if (!this.isShowCollapse(attributes)) return false;
    const [width, height] = this.getSize(attributes);

    return {
      backgroundFill: color,
      backgroundHeight: 12,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: '#fff',
      fontFamily: 'iconfont',
      fontSize: 8,
      text: '>',
      textAlign: 'center' as const,
      visibility: showIcon ? ('visible' as const) : ('hidden' as const),
      x: direction === 'left' ? -6 : width + 6,
      y: height,
    };
  }

  drawCollapseShape(attributes: any, container: any) {
    const iconStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse-expand', Badge, iconStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event: any) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: !attributes.collapsed,
      });
    });
  }

  getCountStyle(attributes: any) {
    const { collapsed, color, direction } = attributes;
    const count = this.context.model.getDescendantsData(this.id).length;
    if (!collapsed || count === 0) return false;
    const [width, height] = this.getSize(attributes);
    return {
      backgroundFill: color,
      backgroundHeight: 12,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: '#fff',
      fontSize: 8,
      text: count.toString(),
      textAlign: 'center' as const,
      x: direction === 'left' ? -6 : width + 6,
      y: height,
    };
  }

  drawCountShape(attributes: any, container: any) {
    const countStyle = this.getCountStyle(attributes);
    const btn = this.upsert('count', Badge, countStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event: any) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: false,
      });
    });
  }

  forwardEvent(target: any, type: string, listener: any) {
    if (target && !Reflect.has(target, '__bind__')) {
      Reflect.set(target, '__bind__', true);
      target.addEventListener(type, listener);
    }
  }

  getKeyStyle(attributes: any) {
    const [width, height] = this.getSize(attributes);
    const keyShape = super.getKeyStyle(attributes);
    return { width, height, ...keyShape };
  }

  drawKeyShape(attributes: any, container: any) {
    const keyStyle = this.getKeyStyle(attributes);
    return this.upsert('key', Rect, keyStyle, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);
    this.drawCollapseShape(attributes, container);
    this.drawCountShape(attributes, container);
  }
}

class MindmapEdge extends CubicHorizontal {
  get rootId() {
    return idOf(this.context.model.getRootsData()[0]);
  }

  getKeyPath(attributes: any) {
    const path = super.getKeyPath(attributes);
    const isRoot = (this.targetNode as any).id === this.rootId;
    const labelWidth = getNodeWidth((this.targetNode as any).id, isRoot);

    const [, tp] = this.getEndpoints(attributes);
    const sign =
      (this.sourceNode as any).getCenter()[0] < (this.targetNode as any).getCenter()[0] ? 1 : -1;
    return [...path, ['L', tp[0] + labelWidth * sign, tp[1]]];
  }
}

class CollapseExpandTree extends BaseBehavior {
  status = 'idle';

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
  }

  unbindEvents() {
    const { graph } = this.context;
    graph.off(NodeEvent.POINTER_ENTER, this.showIcon);
    graph.off(NodeEvent.POINTER_LEAVE, this.hideIcon);
    graph.off(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
  }

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
    const { graph, element } = this.context;
    graph.updateNodeData([{ id, style: { showIcon: show } }]);
    element!.draw({ animation: false, silence: true });
  };

  onCollapseExpand = async (event: any) => {
    this.status = 'busy';
    const { id, collapsed } = event;
    const { graph } = this.context;
    await graph.frontElement(id);
    if (collapsed) await graph.collapseElement(id);
    else await graph.expandElement(id);
    this.status = 'idle';
  };
}

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
    colors: [
      '#1783FF',
      '#F08F56',
      '#D580FF',
      '#00C9C9',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
  };

  constructor(context: any, options: any) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }

  beforeDraw(input: any) {
    const nodes = this.context.model.getNodeData();
    if (nodes.length === 0) return input;

    let colorIndex = 0;
    const dfs = (nodeId: string, color?: string) => {
      const node = nodes.find((datum: any) => datum.id == nodeId);
      if (!node) return;

      node.style ||= {};
      node.style.color =
        color || (this.options as any).colors[colorIndex++ % (this.options as any).colors.length];
      node.children?.forEach((childId: string) => dfs(childId, node.style?.color));
    };

    nodes.filter((node: any) => node.depth === 1).forEach((rootNode: any) => dfs(rootNode.id));

    return input;
  }
}

// Register custom extensions
register(ExtensionCategory.NODE, 'mindmap', MindmapNode);
register(ExtensionCategory.EDGE, 'mindmap', MindmapEdge);
register(ExtensionCategory.BEHAVIOR, 'collapse-expand-tree', CollapseExpandTree);
register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);

const getNodeSide = (nodeData: any, parentData: any) => {
  if (!parentData) return 'center';
  const nodePositionX = positionOf(nodeData)[0];
  const parentPositionX = positionOf(parentData)[0];
  return parentPositionX > nodePositionX ? 'left' : 'right';
};

/**
 * MindMap using @antv/g6 directly with custom node, edge, and behavior implementations.
 *
 * @example
 * ```ts
 * const mindMap = MindMap({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * mindMap.render({
 *   type: 'mind-map',
 *   data: {
 *     name: '项目计划',
 *     children: [
 *       { name: '研究阶段' },
 *       { name: '设计阶段' },
 *       { name: '开发阶段' },
 *     ],
 *   },
 * });
 *
 * mindMap.destroy();
 * ```
 */
export const MindMap = (options: VisualizationOptions): MindMapInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  let graph: Graph | null = null;

  const renderComponent = (config: MindMapConfig): void => {
    const { data, theme = 'default' } = config;

    // Transform data from vis format to G6 format
    const graphData = treeToGraphData(data as any);
    const rootId = graphData.nodes[0]?.id;

    // Destroy existing graph if any
    if (graph) {
      graph.destroy();
    }

    const themeColors = G6THEME_MAP[theme];

    // Create G6 graph with mindmap layout
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      data: graphData,
      autoFit: 'view',
      autoResize: true,
      node: {
        type: 'mindmap',
        style: function (this: any, d: any) {
          const direction = getNodeSide(d, this.getParentData(idOf(d), 'tree'));
          const isRoot = idOf(d) === rootId;

          return {
            direction,
            labelText: idOf(d),
            size: getNodeSize(idOf(d), isRoot),
            labelFontFamily: 'Gill Sans',
            labelBackground: true,
            labelBackgroundFill: 'transparent',
            labelPadding: direction === 'left' ? [2, 0, 10, 40] : [2, 40, 10, 0],
            ...(isRoot ? RootNodeStyle : NodeStyle),
          };
        },
      },
      edge: {
        type: 'mindmap',
        style: {
          lineWidth: 3,
          stroke: function (this: any, data: any) {
            return this.getNodeData(data.target).style.color || '#99ADD1';
          },
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => 30,
        getWidth: (node: any) => getNodeWidth(node.id, node.id === rootId),
        getVGap: () => 6,
        getHGap: () => 60,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'collapse-expand-tree'],
      transforms: [
        {
          type: 'assign-color-by-branch',
          key: 'assign-color-by-branch',
          ...(themeColors?.palette ? { colors: themeColors.palette } : {}),
        },
      ],
      animation: false,
    });

    graph.once(GraphEvent.AFTER_RENDER, () => {
      graph!.fitView();
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
    render: renderComponent,
    destroy,
  };
};
