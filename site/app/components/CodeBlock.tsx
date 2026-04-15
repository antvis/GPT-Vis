import { type CSSProperties } from 'react';
import { codeToTokens, type BundledLanguage, type ThemedToken } from 'shiki';
import { CopyButton } from './CopyButton';

type Theme = 'dark' | 'light';

interface CodeBlockProps {
  code: string;
  lang?: string;
  label?: string;
  theme?: Theme;
}

const shikiTheme: Record<Theme, string> = {
  dark: 'github-dark',
  light: 'github-light',
};

const wrapperStyles: Record<Theme, string> = {
  dark: 'bg-slate-950',
  light: 'bg-white border border-outline-variant',
};

const labelStyles: Record<Theme, string> = {
  dark: 'text-slate-500',
  light: 'text-on-surface-variant/60',
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

export async function CodeBlock({ code, lang = 'text', label, theme = 'light' }: CodeBlockProps) {
  const { tokens, fg } = await codeToTokens(code, {
    lang: lang as BundledLanguage,
    theme: shikiTheme[theme],
  });

  return (
    <div className={`${wrapperStyles[theme]} rounded-xl w-full relative group`}>
      {label ? (
        <div className="flex justify-between items-center px-6 pt-4 mb-0">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${labelStyles[theme]}`}>
            {label}
          </span>
          <CopyButton text={code} theme={theme} />
        </div>
      ) : (
        <div className="absolute z-10" style={{ right: 24, top: 14 }}>
          <CopyButton text={code} theme={theme} />
        </div>
      )}
      <div className={label ? 'p-6 pt-3' : 'px-6 py-4 pr-12'}>
        <pre className="m-0 overflow-x-auto" style={{ background: 'transparent', color: fg }}>
          <code className="text-sm leading-relaxed">
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
