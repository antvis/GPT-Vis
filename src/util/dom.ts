export const createTextElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  text: unknown,
  className?: string,
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text == null ? '' : String(text);
  return element;
};

export const appendChildren = (parent: Node, ...children: Node[]): void => {
  children.forEach((child) => parent.appendChild(child));
};
