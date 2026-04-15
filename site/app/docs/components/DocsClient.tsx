'use client';

import { SideBar } from './SideBar';

export function DocsSideBar() {
  const handleItemClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return <SideBar onItemClick={handleItemClick} />;
}
