'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn';
import { useInView } from '../../lib/use-in-view';
import styles from './reveal.module.css';

export function Reveal({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div {...props} ref={ref} className={cn(styles.reveal, className)} data-visible={inView}>
      {children}
    </div>
  );
}
