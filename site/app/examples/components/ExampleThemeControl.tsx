'use client';

import { ArrowUpRight, Palette, RotateCcw } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CopyButton } from '../../components/CopyButton';
import { useTranslation } from '../../components/I18nProvider';
import Link from '../../components/LocaleLink';
import { setActiveTheme, useActiveTheme } from '../../themes/active-theme';
import { DEFAULT_THEME, themeDisplayName, themeSwatch } from '../../themes/presets';
import { StudioDialog } from '../../themes/StudioDialog';
import { formatTheme } from '../../themes/theme-utils';
import { presetThemeId } from '../example-code';

export function ExampleThemeControl() {
  const t = useTranslation();
  const theme = useActiveTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { palette: colors } = themeSwatch(theme);
  const name = themeDisplayName(theme, t);
  return (
    <>
      <button
        type="button"
        className="example-theme-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="example-theme-panel"
        aria-label={t('Current theme: {name}', { name })}
      >
        <Palette className="size-4 text-primary" aria-hidden="true" />
        <span className="min-w-0 text-left">
          <span className="block text-xs text-on-surface-variant">{t('Example theme')}</span>
          <span className="block max-w-40 truncate text-sm font-semibold">{name}</span>
        </span>
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
        description={t('Shared with Theme Studio. Applies to chart and annotation examples.')}
        className="example-theme-panel"
      >
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="break-words text-balance font-semibold">{name}</h3>
              <p className="text-xs text-on-surface-variant">
                {t(presetThemeId(theme) ? 'Preset theme' : 'Custom theme')}
              </p>
            </div>
            <div className="flex shrink-0 -space-x-1" aria-hidden="true">
              {colors.slice(0, 6).map((color, index) => (
                <span
                  key={index}
                  className="size-5 rounded-full border-2 border-white"
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-outline-variant">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container px-4 py-3 text-xs">
              <span>theme.json</span>
              <CopyButton text={formatTheme(theme)} theme="light" />
            </div>
            <pre
              tabIndex={0}
              aria-label={t('Active theme JSON')}
              className="max-h-64 overflow-auto p-4 text-xs tabular-nums"
            >
              <code>{formatTheme(theme)}</code>
            </pre>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <button
              type="button"
              onClick={() => setActiveTheme(DEFAULT_THEME)}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-on-surface-variant hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-primary"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              {t('Reset theme')}
            </button>
            <Link
              href={`/themes?returnTo=${encodeURIComponent(pathname)}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t('Edit in Theme Studio')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-pretty text-xs text-on-surface-variant">
            {t('Copied examples include this theme. Your selection is saved in this browser.')}
          </p>
        </div>
      </StudioDialog>
    </>
  );
}
