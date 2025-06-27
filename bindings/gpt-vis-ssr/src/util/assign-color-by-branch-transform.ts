import { G6 } from '@antv/g6-ssr';
import { DEFAULT_COLOR_PALETTE } from './palette';
const { BaseTransform } = G6;

export class AssignColorByBranchTransform extends BaseTransform {
  static defaultOptions = {
    colors: DEFAULT_COLOR_PALETTE,
  };

  constructor(context: G6.RuntimeContext, options: any) {
    super(context, Object.assign({}, AssignColorByBranchTransform.defaultOptions, options));
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
