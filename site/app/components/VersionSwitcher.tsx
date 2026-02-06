'use client';

import { useEffect, useRef, useState } from 'react';

export default function VersionSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-[#691eff] transition-colors rounded-md hover:bg-gray-50"
        aria-label="Switch version"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium">v1.x</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          role="menu"
        >
          <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
            Select Version
          </div>
          <button
            className="w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between cursor-default bg-gray-50"
            role="menuitem"
            aria-current="true"
            disabled
          >
            <span className="text-gray-900 font-medium">v1.x</span>
            <span className="text-xs text-[#691eff] font-medium">Current</span>
          </button>
          <a
            href="https://gpt-vis-0.x-site.antv.vision/"
            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#691eff] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
          >
            v0.x
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      )}
    </div>
  );
}
