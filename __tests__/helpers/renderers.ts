export const chartOptions: any[] = [];
export const graphOptions: any[] = [];
export const textInstances: MockText[] = [];

export class MockChart {
  private context = { library: {} };
  getContext() {
    return this.context;
  }
  options(options: any) {
    chartOptions.push(options);
    return this;
  }
  render() {
    return this;
  }
  destroy() {
    return this;
  }
}

export class MockGraph {
  on() {
    return this;
  }
  off() {
    return this;
  }
  constructor(options: any) {
    graphOptions.push(options);
  }
  render() {
    return this;
  }
  destroy() {
    return this;
  }
  once() {
    return this;
  }
  zoomTo() {
    return this;
  }
  getZoom() {
    return 1;
  }
}

export const createContainer = () =>
  ({ innerHTML: '', style: {}, querySelectorAll: () => [] }) as unknown as HTMLElement;

export class MockText {
  themeArgs?: unknown[];
  syntax?: string;
  constructor() {
    textInstances.push(this);
  }
  theme(...args: unknown[]) {
    this.themeArgs = args;
    return this;
  }
  render(syntax: string) {
    this.syntax = syntax;
    return this;
  }
  unmount() {
    return this;
  }
}

export class MockElement {
  attributes: Record<string, string> = {};
  children: MockElement[] = [];
  className = '';
  innerHTML = '';
  parentNode: MockElement | null = null;
  style: Record<string, string> = {};
  textContent = '';

  private single = new Map<string, MockElement>();
  private multiple = new Map<string, MockElement[]>();

  appendChild(child: MockElement) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  removeChild(child: MockElement) {
    this.children = this.children.filter((item) => item !== child);
    child.parentNode = null;
    return child;
  }

  remove() {
    this.parentNode?.removeChild(this);
  }

  setAttribute(name: string, value: string) {
    this.attributes[name] = value;
  }

  querySelector(selector: string) {
    if (!this.single.has(selector)) this.single.set(selector, new MockElement());
    return this.single.get(selector)!;
  }

  querySelectorAll(selector: string) {
    if (!this.multiple.has(selector)) this.multiple.set(selector, [new MockElement()]);
    return this.multiple.get(selector)!;
  }
}
