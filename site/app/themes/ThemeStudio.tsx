'use client';

import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Copy,
  Expand,
  FileJson2,
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
  THEME_CREATOR_PROMPT,
  themeUsage,
} from './theme-utils';
import { ThemeChart } from './ThemeChart';
import styles from './themes.module.css';

const STORAGE_KEY = 'gpt-vis:theme-studio:v1';
const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const secondaryButton = `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40 ${focus}`;
const editorTool = `inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 ${focus}`;

export default function ThemeStudio({ examples }: { examples: ThemeExample[] }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [source, setSource] = useState(DEFAULT_THEME.id);
  const [draft, setDraft] = useState(formatTheme(DEFAULT_THEME));
  const [restored, setRestored] = useState(false);
  const [copied, setCopied] = useState('');
  const [notice, setNotice] = useState('');
  const [sharing, setSharing] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [expanded, setExpanded] = useState<ThemeExample | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const parsed = useMemo(() => {
    try {
      return { theme: parseThemeSpec(draft), error: '' };
    } catch (error) {
      return { theme: null, error: error instanceof Error ? error.message : String(error) };
    }
  }, [draft]);
  const pending = Boolean(parsed.theme && JSON.stringify(parsed.theme) !== JSON.stringify(theme));
  const usage = themeUsage(parsed.theme ?? theme);

  useEffect(() => {
    let active = true;
    const loadSharedTheme = async () => {
      const hash = window.location.hash;
      try {
        const shared = await decodeThemeHash(hash);
        if (shared && active && hash === window.location.hash) {
          setTheme(shared);
          setSource('custom');
          setDraft(formatTheme(shared));
          setNotice('');
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
              setDraft(preset ? formatTheme(preset) : snapshot.draft);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ source, draft, custom: theme }));
    } catch {
      /* Preview, import, export, and sharing work without local storage. */
    }
  }, [source, draft, theme, restored]);

  useEffect(() => {
    if (!pending || !parsed.theme) return;
    const next = parsed.theme;
    const timer = setTimeout(() => setTheme(next), 350);
    return () => clearTimeout(timer);
  }, [parsed.theme, pending]);

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
    setDraft(formatTheme(preset));
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
    if (!parsed.theme) return;
    setSharing(true);
    try {
      const hash = await encodeThemeHash(parsed.theme);
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
    if (!parsed.theme) return;
    const url = URL.createObjectURL(
      new Blob([formatTheme(parsed.theme)], { type: 'application/json' }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${parsed.theme.id.replace(/[^a-z0-9-]/gi, '-')}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importFile(file?: File) {
    if (!file) return;
    try {
      edit(await file.text());
    } catch {
      setNotice('Could not read this file. Paste its JSON into the editor instead.');
    }
  }

  function editor(id: string, large = false) {
    const errorId = `${id}-error`;
    return (
      <div>
        <div
          className={cn(
            'overflow-hidden rounded-xl border bg-slate-950 shadow-sm focus-within:ring-2 focus-within:ring-primary/40',
            parsed.error ? 'border-amber-500' : 'border-slate-800',
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3">
            <label
              htmlFor={id}
              className="flex items-center gap-2 font-mono text-xs font-medium text-slate-300"
            >
              <FileJson2 aria-hidden="true" className="size-3.5 text-violet-300" />
              theme.json
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (parsed.theme) edit(formatTheme(parsed.theme));
                }}
                disabled={!parsed.theme}
                aria-label="Format JSON"
                title="Format JSON"
                className={editorTool}
              >
                <Braces aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Import JSON"
                title="Import JSON"
                className={editorTool}
              >
                <FileUp aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => void copy(draft, 'json')}
                aria-label={copied === 'json' ? 'Theme JSON copied' : 'Copy theme JSON'}
                title={copied === 'json' ? 'Copied' : 'Copy theme JSON'}
                className={cn(editorTool, copied === 'json' && 'text-emerald-400')}
              >
                {copied === 'json' ? (
                  <Check aria-hidden="true" className={cn('size-4', styles.feedback)} />
                ) : (
                  <Copy aria-hidden="true" className="size-4" />
                )}
              </button>
              {!large && (
                <button
                  type="button"
                  onClick={() => setEditorOpen(true)}
                  aria-label="Expand editor"
                  title="Expand editor"
                  className={editorTool}
                >
                  <Expand aria-hidden="true" className="size-4" />
                </button>
              )}
            </div>
          </div>
          <textarea
            id={id}
            value={draft}
            onChange={(event) => edit(event.target.value)}
            aria-invalid={Boolean(parsed.error)}
            aria-describedby={parsed.error ? errorId : undefined}
            spellCheck={false}
            className={cn(
              'block w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-slate-200 caret-violet-300 focus-visible:outline-none',
              large ? 'h-[55dvh] min-h-80' : 'h-72 min-h-52 lg:h-[32dvh]',
            )}
          />
          <div
            role="status"
            aria-live="polite"
            className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-xs"
          >
            <span
              className={cn(
                'flex items-center gap-1.5',
                parsed.error ? 'text-amber-300' : 'text-emerald-300',
              )}
            >
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  parsed.error ? 'bg-amber-300' : 'bg-emerald-300',
                )}
              />
              {parsed.error ? 'Invalid JSON' : pending ? 'Updating…' : 'Applied'}
            </span>
            <span className="font-mono text-slate-400">JSON</span>
          </div>
        </div>
        {parsed.error && (
          <p
            id={errorId}
            role="alert"
            className="mt-2 text-pretty text-xs leading-5 text-amber-800"
          >
            {parsed.error} Preview keeps the last valid theme.
          </p>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-surface-container">
      <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside
          aria-label="Theme tools"
          className="min-w-0 self-start border-b border-outline-variant bg-white lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto lg:border-r lg:border-b-0"
        >
          <div className="p-5 sm:p-6">
            <Link
              href="/themes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <Palette aria-hidden="true" className="size-4" />
              Theme Studio
            </Link>
            <h1 className="mt-2 text-balance text-2xl font-bold leading-tight">
              Make it your own.
            </h1>

            <section aria-labelledby="preset-heading" className="mt-6">
              <h2
                id="preset-heading"
                className="mb-3 flex items-center gap-2 text-sm font-semibold"
              >
                <span className="flex size-5 items-center justify-center rounded-md bg-primary-container font-mono text-xs text-primary">
                  1
                </span>
                Choose a starting point
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {THEME_PRESETS.map((preset) => {
                  const selected = source === preset.id;
                  const palette = preset.tokens!.category10!;
                  return (
                    <button
                      type="button"
                      key={preset.id}
                      aria-pressed={selected}
                      title={preset.label}
                      onClick={() => choose(preset)}
                      className={cn(
                        'relative flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border p-2 text-left transition-colors duration-150 motion-reduce:transition-none',
                        selected
                          ? 'border-primary bg-primary-container/30 ring-1 ring-primary'
                          : 'border-outline-variant hover:border-primary/40',
                        focus,
                      )}
                    >
                      <span className="relative shrink-0" aria-hidden="true">
                        <svg
                          viewBox="0 0 32 32"
                          className="size-8 rounded-md"
                          style={{ backgroundColor: preset.tokens!.colorBackground }}
                        >
                          {[14, 22, 18].map((height, index) => (
                            <rect
                              key={index}
                              x={5 + index * 8}
                              y={27 - height}
                              width="6"
                              height={height}
                              rx={Math.min(preset.tokens!.radius ?? 0, 2)}
                              fill={palette[index]}
                            />
                          ))}
                        </svg>
                        {selected && (
                          <span className="absolute -bottom-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-white">
                            <Check className="size-2.5" />
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold">{preset.label}</span>
                        <span className="mt-1.5 flex gap-0.5" aria-hidden="true">
                          {palette.slice(0, 5).map((color) => (
                            <span
                              key={color}
                              className="h-1 flex-1 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="editor-heading" className="mt-6">
              <h2
                id="editor-heading"
                className="mb-3 flex items-center gap-2 text-sm font-semibold"
              >
                <span className="flex size-5 items-center justify-center rounded-md bg-primary-container font-mono text-xs text-primary">
                  2
                </span>
                Edit your theme
              </h2>
              {editor('theme-editor')}
            </section>

            <section aria-labelledby="share-heading" className="mt-6">
              <h2 id="share-heading" className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <span className="flex size-5 items-center justify-center rounded-md bg-primary-container font-mono text-xs text-primary">
                  3
                </span>
                Share & use
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => void share()}
                  disabled={sharing || !parsed.theme}
                  className={secondaryButton}
                >
                  {copied === 'link' ? (
                    <Check aria-hidden="true" className={cn('size-4', styles.feedback)} />
                  ) : (
                    <Link2 aria-hidden="true" className="size-4" />
                  )}
                  {copied === 'link' ? 'Link copied' : sharing ? 'Creating…' : 'Share preview'}
                </button>
                <button
                  type="button"
                  onClick={() => setCodeOpen(true)}
                  disabled={!parsed.theme}
                  className={cn(
                    secondaryButton,
                    'border-primary/20 bg-primary-container/40 text-primary hover:bg-primary-container',
                  )}
                >
                  <Code2 aria-hidden="true" className="size-4" />
                  Use theme
                </button>
              </div>
              <button
                type="button"
                onClick={download}
                disabled={!parsed.theme}
                className={cn(
                  'mt-2 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-1 text-xs font-medium text-slate-500 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40',
                  focus,
                )}
              >
                <ArrowDownToLine aria-hidden="true" className="size-3.5" />
                Download JSON
              </button>
            </section>
            <div
              role="status"
              aria-live="polite"
              className={cn(
                notice
                  ? 'mt-3 rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-pretty text-xs leading-5 text-on-surface-variant'
                  : 'sr-only',
              )}
            >
              {notice ||
                (copied
                  ? `${copied === 'prompt' ? 'Creation prompt' : copied === 'link' ? 'Share link' : copied === 'usage' ? 'Usage code' : 'Theme JSON'} copied to clipboard.`
                  : '')}
            </div>
          </div>
        </aside>

        <section aria-label="Theme gallery" className="min-w-0 px-5 py-7 sm:px-8 lg:py-9">
          <header className="mb-7">
            <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
              <div className="min-w-0 flex-1 basis-64 py-1">
                <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="size-1.5 rounded-full bg-primary" />
                  THEME PREVIEW
                </p>
                <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
                  {theme.label}
                  <span className="text-primary">.</span>
                </h2>
                {theme.description && (
                  <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-slate-500">
                    {theme.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setAiOpen(true)}
                aria-label="View AI creation guide and prompt"
                aria-haspopup="dialog"
                className={cn(
                  'group inline-flex min-h-20 cursor-pointer items-center gap-3 rounded-2xl border border-outline-variant bg-white py-2 pr-4 pl-2 text-left shadow-sm hover:border-primary/30',
                  styles.aiTrigger,
                  focus,
                )}
              >
                <svg
                  viewBox="0 0 80 64"
                  aria-hidden="true"
                  className="h-16 w-20 shrink-0 overflow-visible"
                >
                  <g className={styles.aiSwatchBack}>
                    <rect
                      x="20"
                      y="10"
                      width="38"
                      height="46"
                      rx="7"
                      fill="#e8f4fd"
                      stroke="#c8dfef"
                    />
                    <path
                      d="M26 39L33 28L40 33L51 20"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <g className={styles.aiSwatchFront}>
                    <rect
                      x="20"
                      y="10"
                      width="38"
                      height="46"
                      rx="7"
                      fill="white"
                      stroke="#d9d7e6"
                    />
                    <rect x="26" y="21" width="5" height="18" rx="2" fill="#7047eb" />
                    <rect x="35" y="29" width="5" height="10" rx="2" fill="#3b9bb7" />
                    <rect x="44" y="17" width="5" height="22" rx="2" fill="#f0af54" />
                    <path d="M26 46H49" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                  </g>
                  <path
                    d="M65 6L66.8 11.2L72 13L66.8 14.8L65 20L63.2 14.8L58 13L63.2 11.2Z"
                    fill="currentColor"
                    className="text-primary"
                  />
                </svg>
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-base font-semibold text-on-surface">
                    Create with AI
                    <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  </span>
                  <span className="text-xs font-medium text-slate-500">Theme creator Skill</span>
                </span>
                <span className="ml-2 flex size-8 items-center justify-center rounded-full bg-primary-container text-primary">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </span>
              </button>
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

          <div className="columns-1 gap-5 md:columns-2 2xl:columns-3">
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
        <div className="p-6">{editor('theme-editor-expanded', true)}</div>
      </StudioDialog>
      <StudioDialog
        open={codeOpen}
        title="A theme you can take anywhere"
        description="Download the theme JSON beside your code, then pass it to any GPT-Vis chart."
        onClose={() => setCodeOpen(false)}
      >
        <div className="p-6">
          <pre className="overflow-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-200">
            <code>{usage}</code>
          </pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={download} className={secondaryButton}>
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              Download theme
            </button>
            <button
              type="button"
              onClick={() => void copy(usage, 'usage')}
              className={secondaryButton}
            >
              <Copy aria-hidden="true" className="size-4" />
              {copied === 'usage' ? 'Copied' : 'Copy code'}
            </button>
          </div>
        </div>
      </StudioDialog>
      <StudioDialog
        open={aiOpen}
        title="Create your theme with AI"
        description="Send this prompt and your references to your AI agent, then paste the ThemeSpec JSON into the editor."
        onClose={() => setAiOpen(false)}
      >
        <div className="p-6">
          <ol className="mb-5 grid gap-3 text-sm font-medium sm:grid-cols-3">
            {['Copy the prompt', 'Generate with the Skill', 'Paste & refine your theme'].map(
              (step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary-container font-mono text-xs text-primary">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ),
            )}
          </ol>
          <pre className="max-h-[45dvh] overflow-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-200">
            {THEME_CREATOR_PROMPT}
          </pre>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => void copy(THEME_CREATOR_PROMPT, 'prompt')}
              className={cn(
                secondaryButton,
                'border-primary bg-primary text-white hover:bg-primary-dim',
              )}
            >
              {copied === 'prompt' ? (
                <Check aria-hidden="true" className="size-4" />
              ) : (
                <Copy aria-hidden="true" className="size-4" />
              )}
              {copied === 'prompt' ? 'Prompt copied' : 'Copy creation prompt'}
            </button>
            <Link
              href="https://github.com/antvis/GPT-Vis/blob/ai/skills/theme-creator/SKILL.md"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-medium text-primary',
                focus,
              )}
            >
              View Skill
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
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
