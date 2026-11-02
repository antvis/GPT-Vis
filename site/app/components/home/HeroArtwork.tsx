'use client';

import { Code2, GitBranch, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import { useInView } from '../../lib/use-in-view';
import { THEME_EXAMPLES } from '../../themes/examples';
import styles from './hero-artwork.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export function HeroArtwork() {
  const [scene, setScene] = useState(0);
  const { ref: artwork, inView } = useInView<HTMLElement>({ threshold: 0.25 });
  const frame = useRef(0);
  const pointer = useRef<{
    bounds: DOMRect;
    scrollY: number;
    layers: { element: HTMLElement | SVGElement; depth: number }[];
  } | null>(null);
  const clip = useId();

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function enter(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== 'mouse' ||
      !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
    )
      return;
    // Measure the stationary scene once, before writing any card transforms.
    pointer.current = {
      bounds: event.currentTarget.getBoundingClientRect(),
      scrollY: window.scrollY,
      layers: Array.from(
        event.currentTarget.querySelectorAll<HTMLElement | SVGElement>(
          `.${styles.paper}, .${styles.starSticker}, .${styles.handwritten}`,
        ),
        (element) => ({
          element,
          depth: Number(getComputedStyle(element).getPropertyValue('--depth')),
        }),
      ),
    };
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const motion = pointer.current;
    if (!motion) return;
    const { bounds, layers, scrollY } = motion;
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(
      -1,
      Math.min(
        1,
        ((event.clientY - bounds.top + window.scrollY - scrollY) / bounds.height - 0.5) * 2,
      ),
    );
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      for (const { element, depth } of layers) {
        element.style.translate = `${x * 4 * depth}px ${y * 3 * depth}px`;
      }
    });
  }

  function reset() {
    cancelAnimationFrame(frame.current);
    for (const { element } of pointer.current?.layers ?? []) element.style.translate = '0px 0px';
    pointer.current = null;
  }

  return (
    <figure ref={artwork} className={styles.artwork} data-visible={inView}>
      <div
        className={styles.artScene}
        onPointerEnter={enter}
        onPointerMove={move}
        onPointerLeave={reset}
        onPointerCancel={reset}
        aria-hidden="true"
      >
        <div key={scene} className={styles.artLayers}>
          <svg className={styles.connectors} viewBox="0 0 1100 440" fill="none">
            <path
              d="M100 140C170 30 285 30 330 75M760 60C910 0 1010 35 1020 160M890 350C790 440 630 425 600 370"
              stroke="#b9b0c9"
              strokeDasharray="4 6"
            />
            <path d="M322 65L331 76L315 78M1008 151L1020 164L1029 149" stroke="#b9b0c9" />
          </svg>
          <div className={styles.codeSlip}>
            <div className={styles.paper}>
              <div className={styles.slipTitle}>
                <Code2 size={14} /> a few simple lines
              </div>
              <pre>
                <span>vis</span> line{'\n'}
                <span>data</span>
                {'\n'} - time Jan{'\n'} value 18{'\n'} - time Feb{'\n'} value 28
              </pre>
              <span className={styles.codeCursor} />
            </div>
          </div>
          <div className={styles.mainPlot}>
            <div className={styles.paper}>
              <span className={styles.tape} />
              <div className={styles.plotHeader}>
                <span className={styles.plotDot} /> A good direction <span>JAN — JUN</span>
              </div>
              <div className={styles.plotMetric}>
                More room to grow.
                <Sparkles size={20} />
              </div>
              <svg viewBox="0 0 540 245" className={styles.plotSvg}>
                <defs>
                  <clipPath id={clip}>
                    <rect width="540" height="245" className={styles.plotMask} />
                  </clipPath>
                </defs>
                {[35, 90, 145, 200].map((y, i) => (
                  <g key={y}>
                    <path d={`M35 ${y}H520`} stroke="#ece9f1" strokeDasharray="3 5" />
                    <text x="4" y={y + 4} fill="#817b8b" fontSize="10">
                      {90 - i * 25}
                    </text>
                  </g>
                ))}
                <g clipPath={`url(#${clip})`}>
                  <path
                    d="M36 180C75 180 92 139 128 145S186 182 222 124S275 137 318 81S378 100 414 58S476 70 516 22V200H36Z"
                    fill="#7047eb"
                    fillOpacity=".09"
                  />
                  <path
                    d="M36 180C75 180 92 139 128 145S186 182 222 124S275 137 318 81S378 100 414 58S476 70 516 22"
                    fill="none"
                    stroke="#7047eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M36 193C84 191 89 169 128 174S185 156 222 163S283 122 318 137S376 113 414 122S473 84 516 96"
                    fill="none"
                    stroke="#3b9bb7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {[
                    [36, 180],
                    [128, 145],
                    [222, 124],
                    [318, 81],
                    [414, 58],
                    [516, 22],
                  ].map(([x, y]) => (
                    <circle
                      key={x}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="white"
                      stroke="#7047eb"
                      strokeWidth="2"
                    />
                  ))}
                </g>
                {months.map((month, i) => (
                  <text
                    key={month}
                    x={36 + i * 96}
                    y="228"
                    textAnchor="middle"
                    fill="#817b8b"
                    fontSize="10"
                  >
                    {month}
                  </text>
                ))}
              </svg>
              <div className={styles.plotLegend}>
                <span>
                  <i style={{ background: '#7047eb' }} /> Product
                </span>
                <span>
                  <i style={{ background: '#3b9bb7' }} /> Services
                </span>
                <span>Small inputs. Clearer stories.</span>
              </div>
            </div>
          </div>
          <div className={styles.networkSlip}>
            <div className={styles.paper}>
              <div className={styles.slipTitle}>
                <GitBranch size={13} /> ideas, connected
              </div>
              <svg viewBox="0 0 230 150">
                <g fill="none" stroke="#c8c0d8" strokeWidth="1.5">
                  <path d="M111 68L40 29L35 115L111 68L192 25L199 117L111 68M40 29L192 25M35 115L199 117" />
                </g>
                {[
                  [40, 29, '#b7e1d0'],
                  [35, 115, '#e9b0c1'],
                  [192, 25, '#f1d18b'],
                  [199, 117, '#bcadf1'],
                ].map(([x, y, color]) => (
                  <circle
                    key={String(x)}
                    cx={x}
                    cy={y}
                    r="13"
                    fill={String(color)}
                    stroke="white"
                    strokeWidth="3"
                  />
                ))}
                <circle cx="111" cy="68" r="22" fill="#7047eb" />
                <text
                  x="111"
                  y="72"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                >
                  Ideas
                </text>
              </svg>
            </div>
          </div>
          <div className={styles.donutSlip}>
            <div className={styles.paper}>
              <span className={styles.slipTitle}>A little perspective</span>
              <svg viewBox="0 0 210 210">
                <g fill="none" strokeWidth="28" transform="rotate(-90 105 105)">
                  <circle cx="105" cy="105" r="68" stroke="#f0edf5" />
                  <circle cx="105" cy="105" r="68" stroke="#7047eb" strokeDasharray="157 428" />
                  <circle
                    cx="105"
                    cy="105"
                    r="68"
                    stroke="#3b9bb7"
                    strokeDasharray="128 428"
                    strokeDashoffset="-163"
                  />
                  <circle
                    cx="105"
                    cy="105"
                    r="68"
                    stroke="#f0af54"
                    strokeDasharray="79 428"
                    strokeDashoffset="-297"
                  />
                  <circle
                    cx="105"
                    cy="105"
                    r="68"
                    stroke="#e87787"
                    strokeDasharray="39 428"
                    strokeDashoffset="-382"
                  />
                </g>
                <text
                  x="105"
                  y="105"
                  textAnchor="middle"
                  fill="#302b3d"
                  fontSize="32"
                  fontWeight="700"
                >
                  {THEME_EXAMPLES.length}
                </text>
                <text x="105" y="127" textAnchor="middle" fill="#82798d" fontSize="11">
                  ways to see it
                </text>
              </svg>
              <div className={styles.donutCaption}>
                <span /> Make every part count.
              </div>
            </div>
          </div>
          <div className={styles.summarySlip}>
            <div className={styles.paper}>
              <span>THE BIG PICTURE</span>
              <p>
                Less noise.
                <br />
                <strong>More insight.</strong>
              </p>
              <svg width="72" height="24" viewBox="0 0 72 24">
                <path
                  d="M2 20L14 16L24 19L37 9L48 12L69 2"
                  fill="none"
                  stroke="#278160"
                  strokeWidth="2"
                />
                <path d="M59 2H69V12" fill="none" stroke="#278160" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <svg className={styles.starSticker} viewBox="0 0 100 100">
            <path
              d="M50 1L59 24L80 10L78 35L100 39L82 55L96 77L70 75L66 100L49 82L28 98L28 72L3 70L20 50L1 33L27 29L27 4L47 20Z"
              fill="#c7eece"
            />
            <text x="50" y="47" textAnchor="middle" fontSize="12" fontWeight="600" fill="#245136">
              made for
            </text>
            <text
              x="50"
              y="63"
              textAnchor="middle"
              fontSize="14"
              fontStyle="italic"
              fontFamily="Georgia, serif"
              fill="#245136"
            >
              what’s next
            </text>
          </svg>
          <span className={styles.handwritten}>a new point of view ↗</span>
        </div>
      </div>
      <figcaption className="sr-only">
        An illustrated collage of a growing trend, a connected network, a ring chart, and a data
        summary.
      </figcaption>
      <button
        type="button"
        className={styles.replayScene}
        onClick={() => setScene((value) => value + 1)}
      >
        <RotateCcw aria-hidden="true" className="size-3.5" /> Replay the scene
      </button>
    </figure>
  );
}
