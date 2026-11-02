'use client';

import {
  Blocks,
  BookOpen,
  Bot,
  Braces,
  Code2,
  FileCode2,
  FileText,
  Layers,
  LayoutGrid,
  Paintbrush,
  Palette,
  Plug,
  Search,
  Waves,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { docHref, docs } from '../../lib/docs';

const docIcons = {
  introduction: BookOpen,
  'agent-skill': Bot,
  quickstart: Code2,
  syntax: Braces,
  charts: LayoutGrid,
  streaming: Waves,
  themes: Palette,
  styles: Paintbrush,
  'integrations/frameworks': Blocks,
  'integrations/markdown': FileText,
  'integrations/shadcn': Layers,
  'integrations/ecosystem': Plug,
  'reference/theme-spec': FileCode2,
  'reference/api': Code2,
};

export function DocsNavigation({ searchable }: { searchable: { slug: string; text: string }[] }) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const filtered = docs.filter(
    (doc) =>
      !term ||
      `${doc.title} ${doc.description} ${searchable.find((item) => item.slug === doc.slug)?.text ?? ''}`
        .toLowerCase()
        .includes(term),
  );
  const groups = [...new Set(filtered.map((doc) => doc.group))];
  return (
    <>
      <label className="docs-search">
        <Search className="size-4" aria-hidden="true" />
        <span className="sr-only">Search documentation</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search documentation…"
        />
      </label>
      {term && (
        <p className="docs-search-status" role="status">
          {filtered.length} matching pages
        </p>
      )}
      <nav aria-label="Documentation chapters">
        {groups.map((group) => (
          <section key={group}>
            <h2>{group}</h2>
            {filtered
              .filter((doc) => doc.group === group)
              .map((doc) => {
                const Icon = docIcons[doc.slug];
                return (
                  <Link
                    key={doc.slug}
                    href={docHref(doc.slug)}
                    onClick={(event) => {
                      if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                        event.currentTarget.closest('details')?.removeAttribute('open');
                      }
                    }}
                    aria-current={
                      pathname.replace(/\/$/, '') === docHref(doc.slug) ? 'page' : undefined
                    }
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    <span>{doc.title}</span>
                  </Link>
                );
              })}
          </section>
        ))}
      </nav>
      {!filtered.length && (
        <p className="docs-search-status">
          No matching pages. Try “theme”, “streaming”, or “React”.
        </p>
      )}
    </>
  );
}
