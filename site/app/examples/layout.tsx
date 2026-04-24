'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '../components/SideBar';

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isDetail = pathname !== '/examples' && pathname.startsWith('/examples/');
  const chartId = isDetail ? pathname.split('/').pop() : undefined;

  return (
    <div className="max-w-screen-xl mx-auto flex">
      <Sidebar
        {...(isDetail
          ? { activeId: chartId, onClick: (id: string) => router.push(`/examples/${id}`) }
          : {})}
      />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
