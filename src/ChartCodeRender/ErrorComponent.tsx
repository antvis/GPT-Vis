import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lioshi } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const CodeBlock: React.FC<{ node: any; inline: boolean; className: string; children: any }> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1];

  if (!inline && language === 'json') {
    const codeContent = String(children).replace(/\n$/, '');
    return (
      <SyntaxHighlighter
        language={language}
        showLineNumbers={false}
        wrapLines={true}
        style={lioshi}
        customStyle={{
          background: 'transparent',
          padding: '16px',
          margin: 0,
          fontSize: '13px',
          lineHeight: '1.5',
        }}
        codeTagProps={{
          style: {
            background: 'transparent',
          },
        }}
      >
        {codeContent}
      </SyntaxHighlighter>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const ErrorComponent: React.FC<{ data: string; label?: string }> = (props) => {
  const { data, label = 'vis-chart 数据格式异常。' } = props;
  const content = `${label}\n \`\`\`json \n ${data} \n \`\`\`\n`;
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p({ children }: any) {
            return (
              <p style={{ whiteSpace: 'pre-wrap !important', margin: 0, lineHeight: 1 }}>
                {children}
              </p>
            );
          },

          pre({ children }: any) {
            return (
              <pre style={{ margin: 0, background: 'transparent !important' }}>{children}</pre>
            );
          },
          // @ts-ignore
          code: CodeBlock,
        }}
        skipHtml={true}
      >
        {content}
      </ReactMarkdown>
    </>
  );
};
