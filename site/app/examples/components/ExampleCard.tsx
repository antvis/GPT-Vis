import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from '../../components/LocaleLink';

export function ExampleCard({
  id,
  href,
  title,
  description,
  action,
  icon,
  preview,
  category,
}: {
  id: string;
  href: string;
  title: string;
  description: string;
  action: string;
  icon: ReactNode;
  preview: ReactNode;
  category?: string;
}) {
  return (
    <article id={id} className="example-card" data-category={category}>
      <Link href={href} className="example-card-link" aria-label={`${title} · ${action}`}>
        <div className="example-card-heading">
          <span className="example-card-icon">{icon}</span>
          <h3 className="text-balance">{title}</h3>
          <ArrowUpRight className="size-4 example-card-arrow" aria-hidden="true" />
        </div>
        <div className="example-card-preview" aria-hidden="true" inert>
          {preview}
        </div>
        <div className="example-card-caption">
          <p className="text-pretty">{description}</p>
          <span>
            {action} <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
