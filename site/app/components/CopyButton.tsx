'use client';

import { useTranslation } from './I18nProvider';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type Theme = 'dark' | 'light';

const buttonThemeStyles: Record<Theme, string> = {
  dark: 'text-slate-400 hover:text-white',
  light: 'text-on-surface-variant/50 hover:text-on-surface',
};

export function CopyButton({ text, theme = 'dark' }: { text: string; theme?: Theme }) {
  const t = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`transition-colors ${buttonThemeStyles[theme]}`}
      title={copied ? t('Copied!') : t('Copy to clipboard')}
      aria-label={copied ? t('Copied to clipboard') : t('Copy code to clipboard')}
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}
