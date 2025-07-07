import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
        showLineNumbers={true}
        wrapLines={true}
        customStyle={{ borderRadius: 12, fontSize: 12 }}
        style={materialOceanic}
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

export const ErrorComponent: React.FC<{ data: string }> = (props) => {
  const { data } = props;
  const content = `vis-chart 数据格式异常。\n \`\`\`json \n ${data} \n \`\`\`\n`;
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
            return <pre style={{ margin: 0 }}>{children}</pre>;
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
