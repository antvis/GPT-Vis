import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CopyMarkdownButton } from './CopyMarkdownButton';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="examples-breadcrumb-row">
      <nav aria-label="Breadcrumb">
        <Link href="/">GPT-Vis</Link>
        {items.map((item, index) => (
          <span key={item.label}>
            <ChevronRight className="size-3" aria-hidden="true" />
            {item.href && index !== items.length - 1 ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      <CopyMarkdownButton />
    </div>
  );
}
