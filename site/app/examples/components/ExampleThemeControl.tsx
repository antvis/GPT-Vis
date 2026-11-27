'use client';

import { ArrowUpRight, Check, ChevronUp, Palette } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { ThemeSpec } from '../../../../src';
import { useTranslation } from '../../components/I18nProvider';
import Link from '../../components/LocaleLink';
import { cn } from '../../lib/cn';
import { setActiveTheme, useActiveTheme } from '../../themes/active-theme';
import { THEME_PRESETS, themeDisplayName, themeSwatch } from '../../themes/presets';
import { StudioDialog } from '../../themes/StudioDialog';
import { presetThemeId } from '../example-code';

function ThemeSample({ theme }: { theme: ThemeSpec }) {
  const { palette, background, foreground, fontFamily } = themeSwatch(theme);
  return (
    <span
      aria-hidden="true"
      className="flex h-6 items-center justify-between gap-1 rounded-md px-1.5"
      style={{ backgroundColor: background, color: foreground }}
    >
      <span className="text-lg leading-none" style={{ fontFamily }}>
        Aa
      </span>
      <span className="flex overflow-hidden rounded-sm">
        {palette.slice(0, 5).map((color, index) => (
          <span key={index} className="h-3 w-1.5" style={{ backgroundColor: color }} />
        ))}
      </span>
    </span>
  );
}

export function ExampleThemeControl() {
  const t = useTranslation();
  const theme = useActiveTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { palette: colors } = themeSwatch(theme);
  const name = themeDisplayName(theme, t);
  const selectedId = presetThemeId(theme);
  return (
    <>
      <button
        type="button"
        className="example-theme-trigger group transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="example-theme-panel"
        aria-label={t('Current theme: {name}', { name })}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-container text-primary">
          <Palette className="size-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 text-left">
          <span className="block text-[10px] text-on-surface-variant">{t('Example theme')}</span>
          <span className="block max-w-40 truncate text-xs font-semibold">{name}</span>
        </span>
        <ChevronUp
          className="size-3.5 shrink-0 text-on-surface-variant transition-transform duration-150 ease-out group-aria-expanded:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
        <span className="ml-2 flex -space-x-1" aria-hidden="true">
          {colors.slice(0, 4).map((color, index) => (
            <span
              key={index}
              className="size-3 rounded-full border border-white"
              style={{ background: color }}
            />
          ))}
        </span>
      </button>
      <StudioDialog
        id="example-theme-panel"
        open={open}
        onClose={() => setOpen(false)}
        title={t('Example theme')}
        description=""
        className="example-theme-panel"
      >
        <div className="grid grid-cols-3 gap-1.5 p-3">
          {THEME_PRESETS.map((preset) => {
            const selected = selectedId === preset.id;
            const label = themeDisplayName(preset, t);
            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={selected}
                title={label}
                onClick={() => setActiveTheme(preset)}
                className={cn(
                  'group relative min-w-0 cursor-pointer overflow-hidden rounded-lg border p-1 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none',
                  selected
                    ? 'border-primary bg-primary-container/40 ring-1 ring-primary'
                    : 'border-outline-variant bg-white hover:border-primary/40 hover:bg-surface-container',
                )}
              >
                <ThemeSample theme={preset} />
                <span
                  className={cn(
                    'block truncate px-0.5 pt-1 text-[10px] leading-4 font-medium',
                    selected && 'pr-3.5',
                  )}
                >
                  {label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute right-1 bottom-1 flex size-3 items-center justify-center rounded-full bg-primary text-white ring-1 ring-white transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none',
                    selected ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
                  )}
                >
                  <Check className="size-2.5" />
                </span>
              </button>
            );
          })}
        </div>
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          <Check className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span className="min-w-0 truncate">
            {t('Current theme: {name}', { name })}
            {!selectedId && ` · ${t('Custom theme')}`}
          </span>
        </div>
        <div className="flex justify-end border-t border-outline-variant bg-white px-3 py-1 text-xs">
          <Link
            href={`/themes?returnTo=${encodeURIComponent(pathname)}`}
            className="group inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2 font-medium text-primary transition-colors duration-150 hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
          >
            {t('Theme Studio')}
            <ArrowUpRight
              className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </StudioDialog>
    </>
  );
}
