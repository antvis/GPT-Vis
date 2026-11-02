'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './components/Sidebar';
import './examples.css';

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isDetail = pathname !== '/examples' && pathname.startsWith('/examples/');
  const chartId = isDetail ? pathname.split('/').pop() : undefined;

  return (
    <div className="examples-site">
      <a href="#examples-content" className="examples-skip">
        Skip to examples
      </a>
      <div className="examples-layout">
        <Sidebar
          {...(isDetail
            ? { activeId: chartId, onClick: (id: string) => router.push(`/examples/${id}`) }
            : {})}
        />
        <div className="examples-content">{children}</div>
      </div>
    </div>
  );
}
