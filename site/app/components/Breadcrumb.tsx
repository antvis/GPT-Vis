import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center mb-3">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {item.href ? (
            <Link
              href={item.href}
              className="text-[13px] font-bold text-primary hover:underline transition-opacity"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[13px] font-bold text-primary">{item.label}</span>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2.5} />
        </span>
      ))}
    </nav>
  );
}
