'use client';

import { SideBar } from './SideBar';

export function DocsSideBar() {
  const handleItemClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return <SideBar onItemClick={handleItemClick} />;
}
