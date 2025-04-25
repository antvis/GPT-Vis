import { Rect } from '@antv/g';
import { createGraph, G6 } from '@antv/g6-ssr';
import { type MindMapProps } from '@antv/gpt-vis/dist/esm/MindMap';
import type { CanvasRenderingContext2D } from 'canvas';
import { createCanvas } from 'canvas';
import { CommonOptions } from './types';

export type MindMapOptions = CommonOptions & MindMapProps;

const { register, BaseNode, BaseTransform, ExtensionCategory, idOf, positionOf, treeToGraphData } =
  G6;

let canvas: ReturnType<typeof createCanvas> | null = null;
let ctx: CanvasRenderingContext2D | null = null;

type TextStyle = {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
};

const measureText = (style: TextStyle): number => {
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

const getNodeSize = (nodeId: string, isRoot: boolean) => {
  const width = getNodeWidth(nodeId, isRoot);
  const height = isRoot ? 36 : 32;
  return [width, height] as const;
};

class MindmapNode extends BaseNode {
  static defaultStyleProps: object = {
    ...BaseNode.defaultStyleProps,
    showIcon: false,
  };

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  get rootId() {
    return idOf(this.context.model.getRootsData()[0]);
  }

  isShowCollapse(attributes: { collapsed: any; showIcon: any }) {
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
      text: '\ue6e4',
      textAlign: 'center',
      transform: direction === 'left' ? [['rotate', 90]] : [['rotate', -90]],
      visibility: showIcon ? 'visible' : 'hidden',
      x: direction === 'left' ? -6 : width + 6,
      y: height,
    };
  }

  drawCollapseShape() {}

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
      textAlign: 'center',
      x: direction === 'left' ? -6 : width + 6,
      y: height,
    };
  }

  drawCountShape() {}

  getAddStyle(attributes: any) {
    const { collapsed, showIcon, direction } = attributes;
    if (collapsed || !showIcon) return false;
    const [width, height] = this.getSize(attributes);
    const color = '#ddd';

    const offsetX = this.isShowCollapse(attributes) ? 24 : 12;
    const isRoot = this.id === this.rootId;

    return {
      backgroundFill: '#fff',
      backgroundHeight: 12,
      backgroundLineWidth: 1,
      backgroundStroke: color,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: color,
      fontFamily: 'iconfont',
      fontSize: 8,
      text: '\ue664',
      textAlign: 'center',
      x: isRoot ? width + 12 : direction === 'left' ? -offsetX : width + offsetX,
      y: isRoot ? height / 2 : height,
    };
  }

  getAddBarStyle(attributes: any) {
    const { collapsed, showIcon, direction, color = '#1783FF' } = attributes;
    if (collapsed || !showIcon) return false;
    const [width, height] = this.getSize(attributes);

    const offsetX = this.isShowCollapse(attributes) ? 12 : 0;
    const isRoot = this.id === this.rootId;

    const HEIGHT = 2;
    const WIDTH = 6;

    return {
      cursor: 'pointer',
      fill:
        direction === 'left'
          ? `linear-gradient(180deg, #fff 20%, ${color})`
          : `linear-gradient(0deg, #fff 20%, ${color})`,
      height: HEIGHT,
      width: WIDTH,
      x: isRoot ? width : direction === 'left' ? -offsetX - WIDTH : width + offsetX,
      y: isRoot ? height / 2 - HEIGHT / 2 : height - HEIGHT / 2,
      zIndex: -1,
    };
  }

  drawAddShape() {}

  forwardEvent() {}

  getKeyStyle(attributes: any) {
    const [width, height] = this.getSize(attributes);
    const keyShape = super.getKeyStyle(attributes);
    return { width, height, ...keyShape };
  }

  drawKeyShape(attributes: any, container: any) {
    const keyStyle = this.getKeyStyle(attributes);
    // @ts-ignore
    return this.upsert('key', Rect, keyStyle, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);
  }
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

  constructor(context: G6.RuntimeContext, options: any) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }

  beforeDraw(input: any) {
    const nodes = this.context.model.getNodeData();

    if (nodes.length === 0) return input;

    let colorIndex = 0;
    const dfs = (nodeId: string, color: any) => {
      const node = nodes.find((datum) => datum.id == nodeId);
      if (!node) return;

      node.style ||= {};
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
      node.children?.forEach((childId) => dfs(childId, node.style?.color));
    };
    // @ts-ignore
    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));

    return input;
  }
}

register(ExtensionCategory.NODE, 'mindmap', MindmapNode);
register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);

const getNodeSide = (nodeData: any, parentData: any) => {
  if (!parentData) return 'center';

  const nodePositionX = positionOf(nodeData)[0];
  const parentPositionX = positionOf(parentData)[0];
  return parentPositionX > nodePositionX ? 'left' : 'right';
};

function visTreeData2GraphData(data: any) {
  return treeToGraphData(data, {
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
  const { data, width, height } = options;
  const dataParse = visTreeData2GraphData(data);

  const rootId = data.name;

  return await createGraph({
    waitForRender: 300,
    width,
    height,
    data: dataParse,
    padding: 24,
    autoFit: {
      type: 'view',
    },
    node: {
      type: 'mindmap',
      // @ts-ignore
      style: function (d) {
        const direction = getNodeSide(d, this.getParentData(idOf(d), 'tree'));
        const isRoot = idOf(d) === rootId;
        const depth = d.depth;

        return {
          direction,
          labelText: idOf(d),
          size: getNodeSize(idOf(d), isRoot),
          labelFontFamily: 'Gill Sans',
          lineWidth: 2,
          radius: 8,
          stroke: depth === 0 ? '#f1f4f5' : d.style?.color,
          labelBackground: true,
          labelBackgroundFill: 'transparent',
          labelPadding: direction === 'left' ? [2, 0, 10, 40] : [2, 40, 10, 0],
          ...(isRoot ? RootNodeStyle : NodeStyle),
          fill: depth === 0 ? '#f1f4f5' : depth === 1 ? d.style?.color : 'transparent',
          labelFill: depth === 0 ? '#262626' : depth === 1 ? '#FFF' : d.style?.color,
          ports: [{ placement: 'left' }, { placement: 'right' }],
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
      },
    },
    layout: {
      type: 'mindmap',
      direction: 'H',
      getHeight: () => 30,
      getWidth: (node: any) => getNodeWidth(node.id, node.id === rootId),
      getVGap: () => 14,
      getHGap: () => 64,
      animation: false,
    },
    transforms: ['assign-color-by-branch'],
    animation: false,
  });
}
