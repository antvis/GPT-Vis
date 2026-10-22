'use client';

import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Expand,
  FileUp,
  Link2,
  Palette,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ThemeSpec } from '../../../src';
import { cn } from '../lib/cn';
import type { ThemeExample } from './examples';
import { DEFAULT_THEME, THEME_PRESETS } from './presets';
import { StudioDialog } from './StudioDialog';
import {
  decodeThemeHash,
  encodeThemeHash,
  formatTheme,
  parseThemeSpec,
  THEME_AUTHOR_PROMPT,
  themeUsage,
} from './theme-utils';
import { ThemeChart } from './ThemeChart';

const STORAGE_KEY = 'gpt-vis:theme-studio:v1';
const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const secondaryButton = `inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container ${focus}`;

export default function ThemeStudio({ examples }: { examples: ThemeExample[] }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [source, setSource] = useState(DEFAULT_THEME.id);
  const [draft, setDraft] = useState(formatTheme(DEFAULT_THEME));
  const lastCustom = useRef(DEFAULT_THEME);
  const [restored, setRestored] = useState(false);
  const [copied, setCopied] = useState('');
  const [notice, setNotice] = useState('');
  const [sharing, setSharing] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [expanded, setExpanded] = useState<ThemeExample | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedPreset = THEME_PRESETS.find((preset) => preset.id === source);
  const editorValue = selectedPreset ? formatTheme(selectedPreset) : draft;
  const parsed = useMemo(() => {
    try {
      return { theme: parseThemeSpec(editorValue), error: '' };
    } catch (error) {
      return { theme: null, error: error instanceof Error ? error.message : String(error) };
    }
  }, [editorValue]);
  const pending =
    source === 'custom' && parsed.theme && JSON.stringify(parsed.theme) !== JSON.stringify(theme);

  useEffect(() => {
    let active = true;
    const loadSharedTheme = async () => {
      const hash = window.location.hash;
      try {
        const shared = await decodeThemeHash(hash);
        if (shared && active && hash === window.location.hash) {
          lastCustom.current = shared;
          setTheme(shared);
          setSource('custom');
          setDraft(formatTheme(shared));
          setNotice('Shared theme loaded. Make it your own.');
        }
      } catch (error) {
        if (active)
          setNotice(error instanceof Error ? error.message : 'Could not open this theme link.');
      }
    };
    const restore = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const snapshot = JSON.parse(saved);
          if (typeof snapshot.draft === 'string') {
            const custom = parseThemeSpec(JSON.stringify(snapshot.custom));
            const preset = THEME_PRESETS.find((item) => item.id === snapshot.source);
            if (active) {
              lastCustom.current = custom;
              setDraft(snapshot.draft);
              setSource(preset?.id ?? 'custom');
              setTheme(preset ?? custom);
            }
          }
        }
      } catch {
        /* A disabled storage area must not block the studio. */
      }
      await loadSharedTheme();
      if (active) setRestored(true);
    };
    void restore();
    window.addEventListener('hashchange', loadSharedTheme);
    return () => {
      active = false;
      window.removeEventListener('hashchange', loadSharedTheme);
    };
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ source, draft, custom: lastCustom.current }),
      );
    } catch {
      /* Preview, import, export, and sharing work without local storage. */
    }
  }, [source, draft, theme, restored]);

  useEffect(() => {
    if (source !== 'custom' || !parsed.theme) return;
    const next = parsed.theme;
    const timer = setTimeout(() => {
      lastCustom.current = next;
      setTheme(next);
    }, 350);
    return () => clearTimeout(timer);
  }, [parsed, source]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(''), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function edit(value: string) {
    setDraft(value);
    setSource('custom');
  }

  function choose(preset: ThemeSpec) {
    setTheme(preset);
    setSource(preset.id);
    setNotice('');
  }

  async function copy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setNotice('');
    } catch {
      setNotice('Clipboard access is unavailable. Open the editor to select and copy your theme.');
    }
  }

  async function share() {
    setSharing(true);
    try {
      const hash = await encodeThemeHash(theme);
      const url = new URL(window.location.href);
      url.hash = hash;
      await copy(url.href, 'link');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not create a share link.');
    } finally {
      setSharing(false);
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([formatTheme(theme)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${theme.id.replace(/[^a-z0-9-]/gi, '-')}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importFile(file?: File) {
    if (!file) return;
    try {
      edit(await file.text());
      setEditorOpen(true);
    } catch {
      setNotice('Could not read this file. Paste its JSON into the editor instead.');
    }
  }

  function editor(id: string, large = false) {
    const errorId = `${id}-error`;
    return (
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <label htmlFor={id} className="font-mono text-xs font-medium text-slate-500">
            theme.json
          </label>
          <span
            role="status"
            className={cn(
              'flex items-center gap-1 text-xs',
              parsed.error ? 'text-amber-700' : 'text-emerald-700',
            )}
          >
            {parsed.error ? (
              'Needs a little attention'
            ) : pending ? (
              'Updating…'
            ) : (
              <>
                <Check aria-hidden="true" className="size-3" />
                Applied
              </>
            )}
          </span>
        </div>
        <textarea
          id={id}
          value={editorValue}
          onChange={(event) => edit(event.target.value)}
          aria-invalid={Boolean(parsed.error)}
          aria-describedby={errorId}
          spellCheck={false}
          className={cn(
            'block w-full resize-y rounded-xl border bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-200 caret-violet-300 focus-visible:outline-2 focus-visible:outline-primary',
            large ? 'h-[55dvh] min-h-80' : 'h-52 min-h-40',
            parsed.error ? 'border-amber-500' : 'border-slate-800',
          )}
        />
        <p
          id={errorId}
          aria-live="polite"
          className={cn(
            'mt-2 text-pretty text-xs leading-5',
            parsed.error ? 'text-amber-800' : 'text-slate-500',
          )}
        >
          {parsed.error
            ? `${parsed.error} Preview keeps the last valid theme.`
            : 'Valid JSON applies after a 350 ms pause in typing. Invalid input keeps the last preview. Unsupported fields are ignored.'}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (parsed.theme) edit(formatTheme(parsed.theme));
            }}
            disabled={!parsed.theme}
            className={cn(
              'inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40',
              focus,
            )}
          >
            <Braces aria-hidden="true" className="size-3.5" />
            Format
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={cn(
              'inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-slate-600 hover:bg-slate-100',
              focus,
            )}
          >
            <FileUp aria-hidden="true" className="size-3.5" />
            Import
          </button>
          {!large && (
            <button
              type="button"
              onClick={() => setEditorOpen(true)}
              className={cn(
                'ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-primary hover:bg-primary-container',
                focus,
              )}
            >
              <Expand aria-hidden="true" className="size-3.5" />
              Expand
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-surface-container">
      <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside
          aria-label="Theme tools"
          className="border-b border-outline-variant bg-white lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto lg:border-r lg:border-b-0"
        >
          <div className="p-6 lg:p-7">
            <Link
              href="/themes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <Palette aria-hidden="true" className="size-4" />
              Theme Studio
            </Link>
            <h1 className="mt-3 text-balance text-2xl font-bold leading-tight">
              Find your
              <br className="hidden lg:block" /> visual voice.
            </h1>
            <p className="mt-3 text-pretty text-sm leading-6 text-slate-500">
              One theme. Every chart.
              <br />
              Make them unmistakably yours.
            </p>

            <section aria-labelledby="preset-heading" className="mt-7">
              <h2 id="preset-heading" className="mb-3 text-xs font-semibold text-slate-500">
                START WITH A STYLE
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {THEME_PRESETS.map((preset) => {
                  const selected = source === preset.id;
                  const palette = preset.tokens!.category10!;
                  return (
                    <button
                      type="button"
                      key={preset.id}
                      aria-pressed={selected}
                      onClick={() => choose(preset)}
                      className={cn(
                        'relative overflow-hidden rounded-xl border p-2 text-left',
                        selected
                          ? 'border-primary bg-primary-container/30 ring-1 ring-primary'
                          : 'border-outline-variant hover:border-primary/40',
                        focus,
                      )}
                    >
                      <svg
                        viewBox="0 0 116 48"
                        aria-hidden="true"
                        className="w-full rounded-md"
                        style={{ backgroundColor: preset.tokens!.colorBackground }}
                      >
                        <path
                          d="M10 35H106M10 23H106M10 11H106"
                          stroke={preset.tokens!.colorStroke}
                          strokeWidth="0.5"
                        />
                        <path
                          d="M10 35C23 35 23 18 36 21S50 35 63 19S82 25 106 9"
                          fill="none"
                          stroke={palette[0]}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 40C27 37 26 30 42 32S66 27 79 30S93 18 106 22"
                          fill="none"
                          stroke={palette[1]}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="mt-2 flex items-center justify-between gap-1 text-xs font-semibold">
                        {preset.label}
                        {selected && <Check aria-hidden="true" className="size-3.5 text-primary" />}
                      </span>
                      <span className="mt-1.5 flex gap-1" aria-hidden="true">
                        {palette.slice(0, 5).map((color) => (
                          <span
                            key={color}
                            className="h-1.5 flex-1 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                aria-pressed={source === 'custom'}
                onClick={() => {
                  setSource('custom');
                  setTheme(lastCustom.current);
                }}
                className={cn(
                  'mt-2.5 flex min-h-10 w-full items-center justify-between rounded-lg border border-dashed px-3 text-xs font-medium',
                  source === 'custom'
                    ? 'border-primary bg-primary-container/40 text-primary'
                    : 'border-outline-variant text-slate-500 hover:border-primary/40',
                  focus,
                )}
              >
                <span className="flex items-center gap-2">
                  <Braces aria-hidden="true" className="size-3.5" />
                  Your custom theme
                </span>
                {source === 'custom' ? (
                  <Check aria-hidden="true" className="size-3.5" />
                ) : (
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                )}
              </button>
            </section>

            <div className="my-6 border-t border-outline-variant" />
            <section aria-labelledby="create-heading">
              <h2 id="create-heading" className="text-sm font-semibold">
                Make something of your own
              </h2>
              <div className="mt-5">
                <h3 className="flex items-center gap-2 text-xs font-semibold">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary-container text-primary">
                    1
                  </span>
                  Bring your inspiration
                </h3>
                <p className="mt-2 text-pretty text-xs leading-5 text-slate-500">
                  Give the prompt and your references to your AI agent. A website, a slide deck, a
                  feeling.
                </p>
                <button
                  type="button"
                  onClick={() => void copy(THEME_AUTHOR_PROMPT, 'prompt')}
                  className={cn(
                    'mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-xs font-semibold text-white hover:bg-primary-dim',
                    focus,
                  )}
                >
                  {copied === 'prompt' ? (
                    <Check aria-hidden="true" className="size-3.5" />
                  ) : (
                    <Sparkles aria-hidden="true" className="size-3.5" />
                  )}
                  {copied === 'prompt' ? 'Prompt copied' : 'Copy creation prompt'}
                </button>
                <details className="mt-2 text-xs text-slate-500">
                  <summary
                    className={cn(
                      'flex min-h-8 cursor-pointer list-none items-center justify-between rounded px-1',
                      focus,
                    )}
                  >
                    Read the prompt
                    <ChevronDown aria-hidden="true" className="size-3.5" />
                  </summary>
                  <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 font-sans text-xs leading-5">
                    {THEME_AUTHOR_PROMPT}
                  </pre>
                </details>
              </div>
              <details open className="mt-5">
                <summary
                  className={cn(
                    'flex min-h-8 cursor-pointer list-none items-center justify-between rounded',
                    focus,
                  )}
                >
                  <h3 className="flex items-center gap-2 text-xs font-semibold">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary-container text-primary">
                      2
                    </span>
                    Shape your theme
                  </h3>
                  <ChevronDown aria-hidden="true" className="size-3.5 text-slate-400" />
                </summary>
                <div className="mt-3">{editor('theme-editor')}</div>
              </details>
              <section className="mt-5" aria-labelledby="share-heading">
                <h3 id="share-heading" className="flex items-center gap-2 text-xs font-semibold">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary-container text-primary">
                    3
                  </span>
                  Take it with you
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => void share()}
                    disabled={sharing}
                    className={cn(secondaryButton, 'text-xs disabled:opacity-50')}
                  >
                    <Link2 aria-hidden="true" className="size-3.5" />
                    {copied === 'link'
                      ? 'Link copied'
                      : sharing
                        ? 'Creating…'
                        : 'Copy preview link'}
                  </button>
                  <button
                    type="button"
                    onClick={download}
                    className={cn(secondaryButton, 'text-xs')}
                  >
                    <ArrowDownToLine aria-hidden="true" className="size-3.5" />
                    Download
                  </button>
                </div>
                <p className="mt-2 text-pretty text-xs leading-5 text-slate-500">
                  Send a preview link to open this theme in the studio. The complete theme is stored
                  in the link; no upload needed.
                </p>
              </section>
            </section>
            <Link
              href="https://github.com/antvis/GPT-Vis/blob/ai/skills/theme-author/SKILL.md"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'mt-6 inline-flex min-h-9 items-center gap-1.5 rounded text-xs font-medium text-slate-500 hover:text-primary',
                focus,
              )}
            >
              Theme authoring skill
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </aside>

        <section aria-label="Theme gallery" className="min-w-0 px-5 py-7 sm:px-8 lg:px-8 lg:py-9">
          <header className="mb-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="size-1.5 rounded-full bg-primary" />A SHARED VISUAL LANGUAGE
                </p>
                <h2 className="mt-2 text-balance text-3xl font-bold leading-tight sm:text-4xl">
                  {theme.label}
                  <span className="text-primary">.</span>
                </h2>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-6 text-slate-500">
                  {theme.description || 'Your perspective, across every visualization.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copy(formatTheme(theme), 'json')}
                  className={secondaryButton}
                >
                  {copied === 'json' ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    <Copy aria-hidden="true" className="size-4" />
                  )}
                  {copied === 'json' ? 'Copied' : 'Copy theme'}
                </button>
                <button
                  type="button"
                  onClick={() => setCodeOpen(true)}
                  className={cn(secondaryButton, 'border-primary/20 text-primary')}
                >
                  <Code2 aria-hidden="true" className="size-4" />
                  Use theme
                </button>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-4">
              <div className="flex items-center gap-3">
                <span className="flex -space-x-1" aria-label="Theme palette">
                  {(theme.style?.palette ?? theme.tokens?.category10 ?? [])
                    .slice(0, 6)
                    .map((color, i) => (
                      <span
                        key={i}
                        className="size-5 rounded-full border-2 border-surface-container"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                </span>
                <span className="text-xs text-slate-500">
                  {theme.tokens?.fontFamily?.split(',')[0] ?? 'Built-in typography'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                <span className="font-mono tabular-nums">26</span> charts · One ThemeSpec
              </p>
            </div>
          </header>

          <div
            role="status"
            aria-live="polite"
            className={cn(
              notice
                ? 'mb-5 rounded-xl border border-outline-variant bg-white px-4 py-3 text-pretty text-sm text-on-surface-variant'
                : 'sr-only',
            )}
          >
            {notice ||
              (copied
                ? `${copied === 'prompt' ? 'Creation prompt' : copied === 'link' ? 'Share link' : 'Theme JSON'} copied to clipboard.`
                : '')}
          </div>

          <div className="columns-1 gap-5 md:columns-2 lg:columns-2 2xl:columns-3">
            {examples.map((example, index) => (
              <ThemeChart
                key={example.type}
                example={example}
                theme={theme}
                index={index}
                onExpand={() => setExpanded(example)}
              />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant py-5 text-xs text-slate-500">
            <span>A single ThemeSpec, from first impression to finest detail.</span>
            <Link
              href="/docs#themes"
              className={cn(
                'inline-flex min-h-9 items-center gap-1 rounded font-medium hover:text-primary',
                focus,
              )}
            >
              Explore the theme API
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </section>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        aria-label="Import a ThemeSpec JSON file"
        className="sr-only"
        onChange={(event) => {
          void importFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
      <StudioDialog
        open={editorOpen}
        title="Your theme, in detail"
        description="Paste a ThemeSpec or refine the current style. Valid changes update the gallery automatically."
        onClose={() => setEditorOpen(false)}
      >
        <div className="p-6">
          {editor('theme-editor-expanded', true)}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copy(formatTheme(theme), 'json')}
              className={secondaryButton}
            >
              <Copy aria-hidden="true" className="size-4" />
              {copied === 'json' ? 'Copied' : 'Copy applied theme'}
            </button>
            <button type="button" onClick={download} className={secondaryButton}>
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              Download JSON
            </button>
          </div>
        </div>
      </StudioDialog>
      <StudioDialog
        open={codeOpen}
        title="A theme you can take anywhere"
        description="Download the theme JSON beside your code, then pass it to any GPT-Vis chart."
        onClose={() => setCodeOpen(false)}
      >
        <div className="p-6">
          <pre className="overflow-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-200">
            <code>{themeUsage(theme)}</code>
          </pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={download} className={secondaryButton}>
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              Download theme
            </button>
            <button
              type="button"
              onClick={() => void copy(themeUsage(theme), 'usage')}
              className={secondaryButton}
            >
              <Copy aria-hidden="true" className="size-4" />
              {copied === 'usage' ? 'Copied' : 'Copy code'}
            </button>
          </div>
        </div>
      </StudioDialog>
      <StudioDialog
        open={Boolean(expanded)}
        title={expanded?.name ?? 'Chart preview'}
        description={`A closer look at ${theme.label}.`}
        onClose={() => setExpanded(null)}
      >
        {expanded && (
          <div className="p-5">
            <ThemeChart
              expanded
              example={expanded}
              theme={theme}
              index={examples.indexOf(expanded)}
            />
            <p className="text-pretty text-sm leading-6 text-slate-500">{expanded.description}</p>
          </div>
        )}
      </StudioDialog>
    </main>
  );
}
