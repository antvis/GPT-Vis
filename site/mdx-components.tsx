import type { MDXComponents } from 'mdx/types';
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import { CodeBlock } from './app/components/CodeBlock';

function text(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) =>
      isValidElement<{ children?: ReactNode }>(child) ? text(child.props.children) : String(child),
    )
    .join('');
}
function heading(level: 'h2' | 'h3' | 'h4') {
  return function Heading({ children, id }: { children?: ReactNode; id?: string }) {
    const Tag = level;
    const slug =
      id ??
      text(children)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    return <Tag id={slug}>{children}</Tag>;
  };
}
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    pre: ({ children }) => {
      const code = children as ReactElement<{ children?: string; className?: string }>;
      if (isValidElement(code) && typeof code.props.children === 'string') {
        return (
          <CodeBlock
            code={code.props.children.trimEnd()}
            lang={code.props.className?.replace('language-', '') ?? 'text'}
          />
        );
      }
      return <pre>{children}</pre>;
    },
    table: ({ children }) => (
      <div className="docs-table-scroll">
        <table>{children}</table>
      </div>
    ),
    ...components,
  };
}
