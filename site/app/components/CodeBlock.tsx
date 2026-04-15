import { CopyButton } from './CopyButton';

type Theme = 'dark' | 'light';

interface CodeBlockProps {
  code: string;
  label?: string;
  theme?: Theme;
}

const themeStyles: Record<Theme, { wrapper: string; label: string; code: string }> = {
  dark: {
    wrapper: 'bg-slate-950',
    label: 'text-slate-500',
    code: 'text-slate-300',
  },
  light: {
    wrapper: 'bg-white border border-outline-variant',
    label: 'text-on-surface-variant/60',
    code: 'text-on-surface',
  },
};

export function CodeBlock({ code, label, theme = 'light' }: CodeBlockProps) {
  const styles = themeStyles[theme];
  return (
    <div className={`${styles.wrapper} rounded-xl w-full relative group`}>
      {label ? (
        <div className="flex justify-between items-center px-6 pt-4 mb-0">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${styles.label}`}>
            {label}
          </span>
          <CopyButton text={code} theme={theme} />
        </div>
      ) : (
        <div className="absolute  z-10" style={{ right: 24, top: 14 }}>
          <CopyButton text={code} theme={theme} />
        </div>
      )}
      <div className={label ? 'p-6 pt-3' : 'flex items-center px-6 py-4 pr-12'}>
        <code
          className={`code-block text-sm leading-relaxed overflow-x-auto whitespace-pre ${styles.code}`}
        >
          {code}
        </code>
      </div>
    </div>
  );
}
