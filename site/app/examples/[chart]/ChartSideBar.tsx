'use client';

import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/SideBar';

interface ChartSideBarProps {
  activeId: string;
}
export default function ChartSideBar({ activeId }: ChartSideBarProps) {
  const router = useRouter();

  return <Sidebar activeId={activeId} onClick={(id) => router.push(`/examples/${id}`)} />;
}
