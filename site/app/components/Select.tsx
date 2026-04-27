'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface SelectOption {
  label: React.ReactNode;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface DropdownPos {
  top: number;
  left: number;
  width: number;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Please select',
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<DropdownPos | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  const updatePos = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  };

  const handleOpen = () => {
    if (disabled) return;
    updatePos();
    setOpen((v) => !v);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !dropdownRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return;
    const handler = () => updatePos();
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [open]);

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors bg-white
          ${open ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/60'}
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer'}`}
      >
        <span className={selected ? 'text-gray-800' : 'text-gray-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open &&
        pos &&
        createPortal(
          <ul
            ref={dropdownRef}
            role="listbox"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
            className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-auto"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors
                ${opt.value === value ? 'text-primary bg-primary/5 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {opt.label}
                {opt.value === value && <Check className="w-3.5 h-3.5 shrink-0" />}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
