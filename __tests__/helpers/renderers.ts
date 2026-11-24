export const chartOptions: any[] = [];
export const graphOptions: any[] = [];
export const textInstances: MockText[] = [];

export class MockChart {
  private attributes: Record<string, any> = {};
  private listeners = new Map<string, Set<(...args: any[]) => void>>();
  map(transform: (options: Record<string, any>) => Record<string, any>) {
    this.attributes = transform(this.attributes);
    return this;
  }

  options(options?: any) {
    if (!options) return this.attributes;
    this.attributes = options;
    chartOptions.push(options);
    return this;
  }
  attr(name: string, value: any) {
    this.attributes[name] = value;
    return this;
  }
  on(event: string, listener: (...args: any[]) => void) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener);
    return this;
  }
  off(event: string, listener: (...args: any[]) => void) {
    this.listeners.get(event)?.delete(listener);
    return this;
  }
  emit(event: string) {
    this.listeners.get(event)?.forEach((listener) => listener());
    return this;
  }
  render() {
    return this;
  }
  destroy() {
    this.listeners.clear();
    return this;
  }
}

export class MockGraph {
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

  replaceChildren(...children: MockElement[]) {
    for (const child of [...this.children]) this.removeChild(child);
    for (const child of children) this.appendChild(child);
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
