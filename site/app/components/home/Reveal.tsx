'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useInView } from '../../lib/use-in-view';
import styles from './reveal.module.css';

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(styles.reveal, className)} data-visible={inView}>
      {children}
    </div>
  );
}
