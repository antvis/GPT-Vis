'use client';

import { useTranslation } from '../I18nProvider';

import { Pause, Play } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';
import { useInView } from '../../lib/use-in-view';
import styles from './hero-slogan.module.css';

function subscribeVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}
const isPageVisible = () => document.visibilityState === 'visible';
const serverVisible = () => false;

export function HeroSlogan() {
  const t = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });
  const visible = useSyncExternalStore(subscribeVisibility, isPageVisible, serverVisible);
  const [paused, setPaused] = useState(false);
  return (
    <div ref={ref} className={styles.sloganFrame} data-playing={inView && visible && !paused}>
      <h1 id="hero-heading" className={styles.headline}>
        <span className="sr-only">
          {t('Turn AI answers into charts. AI-Native Visualization for the LLM Era.')}{' '}
        </span>
        <span className={styles.sloganStack} aria-hidden="true">
          <span className={styles.sloganLine}>
            {t('Turn AI answers')} <br />
            <span>{t('into charts.')}</span>
          </span>
          <span className={styles.sloganLine}>
            {t('AI-Native Visualization')} <br />
            <span>{t('for the LLM Era.')}</span>
          </span>
        </span>
      </h1>
      <button
        type="button"
        className={styles.sloganPause}
        onClick={() => setPaused(!paused)}
        aria-label={paused ? t('Resume headline rotation') : t('Pause headline rotation')}
        aria-pressed={paused}
      >
        {paused ? (
          <Play className="size-3" aria-hidden="true" />
        ) : (
          <Pause className="size-3" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
