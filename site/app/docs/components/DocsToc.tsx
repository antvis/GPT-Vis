'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DocsToc() {
  const [headings, setHeadings] = useState<{ id: string; text: string; nested: boolean }[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    function update() {
      const next = Array.from(
        document.querySelectorAll<HTMLElement>('.docs-prose h2[id], .docs-prose h3[id]'),
      ).map((node) => ({
        id: node.id,
        text: node.textContent ?? '',
        nested: node.tagName === 'H3',
      }));
      setHeadings((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    }
    const article = document.querySelector('.docs-prose');
    const observer = new MutationObserver(update);
    if (article) observer.observe(article, { subtree: true, childList: true });
    update();
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <aside className="docs-toc" aria-label="On this page">
      <span className="site-eyebrow">ON THIS PAGE</span>
      <nav>
        {headings.map((heading) => (
          <a key={heading.id} href={`#${heading.id}`} data-nested={heading.nested}>
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
