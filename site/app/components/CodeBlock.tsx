import { type CSSProperties } from 'react';
import { codeToTokens, type BundledLanguage, type ThemedToken } from 'shiki';
import { cn } from '../lib/cn';
import { CopyButton } from './CopyButton';

type Theme = 'dark' | 'light';

interface CodeBlockProps {
  code: string;
  lang?: string;
  label?: string;
  theme?: Theme;
  hideCopy?: boolean;
}

const shikiTheme: Record<Theme, string> = {
  dark: 'github-dark',
  light: 'github-light',
};

const wrapperStyles: Record<Theme, string> = {
  dark: 'bg-slate-950',
  light: 'bg-white border border-outline-variant',
};

function tokenStyle(token: ThemedToken): CSSProperties {
  const style: CSSProperties = {};
  if (token.color) style.color = token.color;
  if (token.fontStyle) {
    if (token.fontStyle & 1) style.fontStyle = 'italic';
    if (token.fontStyle & 2) style.fontWeight = 'bold';
    if (token.fontStyle & 4) style.textDecoration = 'underline';
  }
  return style;
}

export async function CodeBlock({
  code,
  lang = 'text',
  label,
  theme = 'light',
  hideCopy = false,
}: CodeBlockProps) {
  const { tokens, fg } = await codeToTokens(code, {
    lang: lang as BundledLanguage,
    theme: shikiTheme[theme],
  });

  return (
    <div className={cn('code-block-shell', wrapperStyles[theme])} data-code-theme={theme}>
      <div className="code-block-toolbar">
        <span>{label ?? lang}</span>
        {!hideCopy && <CopyButton text={code} theme={theme} />}
      </div>
      <div className="code-block-body">
        <pre
          className="m-0 overflow-x-auto text-left"
          style={{ background: 'transparent', color: fg }}
        >
          <code className="text-sm">
            {tokens.map((line, lineIdx) => (
              <span key={lineIdx}>
                {line.map((token, tokenIdx) => (
                  <span key={tokenIdx} style={tokenStyle(token)}>
                    {token.content}
                  </span>
                ))}
                {lineIdx < tokens.length - 1 && '\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
