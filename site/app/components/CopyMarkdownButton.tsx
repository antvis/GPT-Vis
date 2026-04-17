'use client';

import { Check, ChevronDown, ClipboardList, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TurndownService from 'turndown';

type ActionState = 'idle' | 'loading' | 'done';

function ClaudeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#_r_3s_)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.3545 7.9775L4.7145 6.654L4.7545 6.539L4.7145 6.475H4.6L4.205 6.451L2.856 6.4145L1.6865 6.366L0.5535 6.305L0.268 6.2445L0 5.892L0.0275 5.716L0.2675 5.5555L0.6105 5.5855L1.3705 5.637L2.5095 5.716L3.3355 5.7645L4.56 5.892H4.7545L4.782 5.8135L4.715 5.7645L4.6635 5.716L3.4845 4.918L2.2085 4.074L1.5405 3.588L1.1785 3.3425L0.9965 3.1115L0.9175 2.6075L1.2455 2.2465L1.686 2.2765L1.7985 2.307L2.245 2.65L3.199 3.388L4.4445 4.3045L4.627 4.4565L4.6995 4.405L4.709 4.3685L4.627 4.2315L3.9495 3.0085L3.2265 1.7635L2.9045 1.2475L2.8195 0.938C2.78711 0.819128 2.76965 0.696687 2.7675 0.5735L3.1415 0.067L3.348 0L3.846 0.067L4.056 0.249L4.366 0.956L4.867 2.0705L5.6445 3.5855L5.8725 4.0345L5.994 4.4505L6.0395 4.578H6.1185V4.505L6.1825 3.652L6.301 2.6045L6.416 1.257L6.456 0.877L6.644 0.422L7.0175 0.176L7.3095 0.316L7.5495 0.6585L7.516 0.8805L7.373 1.806L7.0935 3.2575L6.9115 4.2285H7.0175L7.139 4.1075L7.6315 3.4545L8.4575 2.4225L8.8225 2.0125L9.2475 1.5605L9.521 1.345H10.0375L10.4175 1.9095L10.2475 2.4925L9.7155 3.166L9.275 3.737L8.643 4.587L8.248 5.267L8.2845 5.322L8.3785 5.312L9.8065 5.009L10.578 4.869L11.4985 4.7115L11.915 4.9055L11.9605 5.103L11.7965 5.5065L10.812 5.7495L9.6575 5.9805L7.938 6.387L7.917 6.402L7.9415 6.4325L8.716 6.5055L9.047 6.5235H9.858L11.368 6.636L11.763 6.897L12 7.216L11.9605 7.4585L11.353 7.7685L10.533 7.574L8.6185 7.119L7.9625 6.9545H7.8715V7.0095L8.418 7.5435L9.421 8.4485L10.6755 9.6135L10.739 9.9025L10.578 10.13L10.408 10.1055L9.3055 9.277L8.88 8.9035L7.917 8.0935H7.853V8.1785L8.075 8.503L9.2475 10.2635L9.3085 10.8035L9.2235 10.98L8.9195 11.0865L8.5855 11.0255L7.8985 10.063L7.191 8.9795L6.6195 8.008L6.5495 8.048L6.2125 11.675L6.0545 11.86L5.69 12L5.3865 11.7695L5.2255 11.396L5.3865 10.658L5.581 9.696L5.7385 8.931L5.8815 7.981L5.9665 7.665L5.9605 7.644L5.8905 7.653L5.1735 8.6365L4.0835 10.109L3.2205 11.0315L3.0135 11.1135L2.655 10.9285L2.6885 10.5975L2.889 10.303L4.083 8.785L4.803 7.844L5.268 7.301L5.265 7.222H5.2375L2.066 9.28L1.501 9.353L1.2575 9.125L1.288 8.752L1.4035 8.6305L2.3575 7.9745L2.3545 7.9775Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="_r_3s_">
          <rect width="12" height="12" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

function ChatGPTIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.403-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

export function CopyMarkdownButton() {
  const [actionState, setActionState] = useState<ActionState>('idle');
  const [open, setOpen] = useState(false);
  const tdRef = useRef<TurndownService | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getMarkdown = () => {
    if (!tdRef.current) {
      tdRef.current = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
      });
    }
    const clone = document.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('script, style, noscript').forEach((el) => el.remove());
    return tdRef.current.turndown(clone);
  };

  const run = async (fn: () => Promise<void>) => {
    if (actionState !== 'idle') return;
    setOpen(false);
    setActionState('loading');
    await fn();
    setActionState('done');
    setTimeout(() => setActionState('idle'), 2500);
  };

  const handleCopy = () =>
    run(async () => {
      await navigator.clipboard.writeText(getMarkdown());
    });

  const getGoToLLM = (baseUrl: string) => () => {
    const prompt = `Read from this URL: ${window.location.href} and explain it to me.`;
    window.open(`https://${baseUrl}/?prompt=${encodeURIComponent(prompt)}`, '_blank');
  };

  const menuItems = [
    {
      id: 'claude',
      icon: <ClaudeIcon />,
      label: 'Open in Claude',
      description: 'Ask questions about this page',
      onClick: getGoToLLM('claude.ai'),
      color: 'text-[#d97706]',
    },
    {
      id: 'chatgpt',
      icon: <ChatGPTIcon />,
      label: 'Open in ChatGPT',
      description: 'Ask questions about this page',
      onClick: getGoToLLM('chatgpt.com'),
      color: 'text-[#10a37f]',
    },
  ];

  return (
    <div ref={containerRef} className="relative inline-flex">
      {/* 主按钮：复制 */}
      <button
        onClick={handleCopy}
        disabled={actionState !== 'idle'}
        className="w-52 group inline-flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-l-lg text-base font-medium transition-all duration-200 border border-outline-variant hover:border-primary/40 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 text-on-surface-variant hover:text-primary bg-white"
      >
        {actionState === 'idle' && (
          <>
            <ClipboardList className="w-5 h-5 shrink-0 transition-transform group-hover:-rotate-6" />
            复制全文 (Markdown)
          </>
        )}
        {actionState === 'loading' && (
          <>
            <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
            处理中...
          </>
        )}
        {actionState === 'done' && (
          <>
            <Check className="w-5 h-5 shrink-0 text-green-500" />
            <span className="text-green-600">已复制到剪贴板</span>
          </>
        )}
      </button>

      {/* 下拉触发按钮 */}
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={actionState !== 'idle'}
        className="inline-flex items-center px-1.5 py-1.5 justify-center rounded-r-lg text-base transition-all duration-200 border border-l-transparent border-outline-variant hover:border-l hover:border-primary/40 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 text-on-surface-variant hover:text-primary bg-white"
      >
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 z-50 w-64 bg-white border border-outline-variant rounded-lg shadow-xl overflow-hidden">
          <div className="p-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-surface-container group/item ${item.color ?? 'text-on-surface-variant'}`}
              >
                <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5 -translate-y-1">{item.icon}</span>
                <div className="min-w-0">
                  <div className="text-base font-medium text-on-surface truncate">{item.label}</div>
                  <div className="text-sm text-on-surface-variant/60 truncate">
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
