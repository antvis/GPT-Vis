import { G6 } from '@antv/g6-ssr';
const { BaseNode } = G6;

export class MindmapNode extends BaseNode {
  static defaultStyleProps: object = {
    ...BaseNode.defaultStyleProps,
    showIcon: false,
  };

  getKeyStyle(attributes: any) {
    const [width, height] = this.getSize(attributes);
    const keyShape = super.getKeyStyle(attributes);
    return { width, height, ...keyShape };
  }

  drawKeyShape(attributes: any, container: any): any {
    const keyStyle = this.getKeyStyle(attributes);
    return this.upsert('key', 'rect', keyStyle, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);
  }
}
