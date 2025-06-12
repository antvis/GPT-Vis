import { G6 } from '@antv/g6-ssr';
const { Rect, Label, Badge } = G6;

/**
 * Custom node for OrganizationChart visualization.
 */
export class OrganizationChartNode extends Rect {
  get data(): any {
    return this.context.model.getElementDataById(this.id).data;
  }

  getLabelStyle(): any {
    const text = this.data.name;
    return {
      text,
      fill: '#2078B4',
      fontSize: 16,
      fontWeight: 400,
      textAlign: 'left',
      transform: [['translate', -55, -10]],
    };
  }

  getKeyStyle(attributes: any): any {
    return {
      ...super.getKeyStyle(attributes),
      fill: '#fff',
    };
  }

  // Draws the description shape.
  drawDescriptionShape(attributes: any, container: any) {
    const positionStyle = {
      text: this.data.description || '-', // Default text if no description is provided
      fontSize: 14,
      fill: '#343f4a',
      textAlign: 'left',
      fontStyle: 'italic',
      transform: [['translate', -55, 10]],
      wordWrapWidth: 200 - 32 - 16, // Width of the node (200) minus the width of the status icon (32) and some padding (16)
    } as any;

    this.upsert('position', Label, positionStyle, container);
  }

  // Draws the organization icon shape.
  drawOrganizationIconShape(attributes: any, container: any) {
    const { fill = '#1783FF' } = attributes;
    const iconStyle = {
      text: (this.data?.name || 'V').slice(0, 1),
      fontSize: 18,
      textAlign: 'center',
      // Half of the width of the node (200) minus half of the status icon width (32) plus some padding (4)
      transform: [['translate', -200 / 2 + 32 / 2 + 4, 0]],
      fill: '#000',
      backgroundFill: fill,
      backgroundRadius: 4,
      backgroundWidth: 32,
      backgroundHeight: 32,
      backgroundOpacity: 0.5,
    } as any;
    this.upsert('organization-icon', Badge, iconStyle, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawDescriptionShape(attributes, container);

    this.drawOrganizationIconShape(attributes, container);
  }
}
