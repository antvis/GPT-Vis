'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

export function StudioDialog({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={title}
      className="m-auto max-h-[calc(100dvh-3rem)] w-11/12 max-w-5xl overflow-auto rounded-2xl border border-outline-variant bg-white p-0 text-on-surface shadow-xl backdrop:bg-slate-950/35"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-outline-variant bg-white px-6 py-4">
        <div>
          <h2 className="text-balance text-lg font-bold">{title}</h2>
          <p className="mt-1 text-pretty text-sm text-on-surface-variant">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={`Close ${title}`}
          className="flex size-11 shrink-0 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-primary"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </header>
      {children}
    </dialog>
  );
}
