'use client';

import { Check, Play, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useInView } from '../lib/use-in-view';
import { DEFAULT_THEME } from '../themes/presets';
import { LiveChart } from './LiveChart';
import styles from './generation-demo.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const revenue = [18, 28, 24, 45, 54, 72];

function subscribeReducedMotion(callback: () => void) {
  const query = matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerSnapshot = () => false;

export function GenerationDemo() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.2 });
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    prefersReducedMotion,
    getServerSnapshot,
  );
  const [step, setStep] = useState(1);
  const progress = reducedMotion ? months.length : step;
  const [format, setFormat] = useState<'syntax' | 'json'>('syntax');
  const playing = progress < months.length;
  const input = useMemo(
    () => ({
      type: 'column',
      data: months.slice(0, progress).map((category, i) => ({ category, value: revenue[i] })),
      axisXTitle: false,
      axisYTitle: false,
      title: 'Revenue ($k)',
    }),
    [progress],
  );
  const syntax = `vis column\ntitle Revenue ($k)\ndata\n${months
    .slice(0, progress)
    .map((category, i) => `  - category ${category}\n    value ${revenue[i]}`)
    .join('\n')}`;
  const code = format === 'syntax' ? syntax : JSON.stringify(input, null, 2);

  useEffect(() => {
    if (!playing || !inView) return;
    const timer = setInterval(() => setStep((value) => Math.min(value + 1, months.length)), 750);
    return () => clearInterval(timer);
  }, [inView, playing]);

  function replay() {
    setStep(1);
  }

  return (
    <div ref={ref} className={styles.generation}>
      <div className={styles.promptBar}>
        <span className={styles.agentIcon}>
          <Sparkles aria-hidden="true" className="size-4" />
        </span>
        <p>“Show me how revenue grew in the first half of the year.”</p>
        <span className={styles.exampleBadge}>EXAMPLE</span>
      </div>
      <div className={styles.generationBody}>
        <div className={styles.syntaxPanel}>
          <div className={styles.demoToolbar}>
            <div className={styles.formatSwitch} role="group" aria-label="Output format">
              {(['syntax', 'json'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={format === value}
                  onClick={() => setFormat(value)}
                >
                  {value === 'syntax' ? 'Vis syntax' : 'JSON'}
                </button>
              ))}
            </div>
            <span className={styles.codeLanguage}>agent output</span>
          </div>
          <pre
            className={styles.syntaxCode}
            tabIndex={0}
            aria-label="Example generated chart configuration"
          >
            <code>
              {code.split('\n').map((line, index) => (
                <span key={index} className={styles.codeLine}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span
                    className={
                      line.startsWith('vis') || line === 'data' ? styles.syntaxKeyword : undefined
                    }
                  >
                    {line || ' '}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultLabel}>
            <span />
            <span>{playing ? 'Taking shape…' : 'Ready to explore'}</span>
            <span className={styles.resultCount}>
              {progress} / {months.length} data points
            </span>
          </div>
          <LiveChart
            input={input}
            theme={DEFAULT_THEME}
            height={310}
            label="Revenue increasing from 18 thousand in January to 72 thousand in June"
          />
        </div>
      </div>
      <div className={styles.demoFooter}>
        <span>
          <Check aria-hidden="true" className="size-3.5" /> Same data. Two readable formats.
        </span>
        <span className={styles.streamSteps} aria-hidden="true">
          {months.map((month, index) => (
            <i key={month} data-received={index < progress} />
          ))}
        </span>
        <button type="button" disabled={playing || reducedMotion} onClick={replay}>
          <Play aria-hidden="true" className="size-3.5" />
          {playing ? 'Playing…' : 'Replay output'}
        </button>
      </div>
    </div>
  );
}
