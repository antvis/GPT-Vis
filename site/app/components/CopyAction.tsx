'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/cn';

export function CopyAction({
  text,
  label = 'Copy',
  className = 'site-button-secondary',
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
    }
  }
  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button type="button" onClick={copy} className={cn('site-button', className)}>
        {status === 'copied' ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        {status === 'copied' ? 'Copied' : label}
      </button>
      <span role="status" className={status === 'error' ? 'text-xs text-red-700' : 'sr-only'}>
        {status === 'error'
          ? 'Could not copy. Select and copy the text below.'
          : status === 'copied'
            ? 'Copied to clipboard.'
            : ''}
      </span>
    </span>
  );
}
