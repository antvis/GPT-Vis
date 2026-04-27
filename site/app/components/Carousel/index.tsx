'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ChartPreview } from '../ChartPreview';
import data from './data';

const row1 = data.slice(0, 8);
const row2 = data.slice(8, 16);

const ROTATIONS = [
  'rotateY(-8deg) rotateX(3deg) rotateZ(-3deg)',
  'rotateY(6deg) rotateX(-4deg) rotateZ(4deg)',
  'rotateY(-4deg) rotateX(-5deg) rotateZ(2deg)',
  'rotateY(7deg) rotateX(4deg) rotateZ(-4deg)',
  'rotateY(3deg) rotateX(-3deg) rotateZ(-2.5deg)',
  'rotateY(-6deg) rotateX(5deg) rotateZ(3.5deg)',
];

function Row({
  charts,
  shouldPlay,
  isLazy,
  offset,
  className,
  rotationOffset = 0,
}: {
  charts: string[];
  shouldPlay: boolean;
  isLazy: boolean;
  offset?: boolean;
  className?: string;
  rotationOffset?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDist, setScrollDist] = useState(0);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const items = trackRef.current.children;
    const count = charts.length;
    let total = 0;
    for (let i = 0; i < count && i < items.length; i++) {
      total += items[i].getBoundingClientRect().width;
    }
    setScrollDist(total);
  }, [charts.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <div
      className={`relative overflow-x-clip w-auto ${className ?? ''}`}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={
          {
            animationName: scrollDist ? 'carousel-scroll' : 'none',
            animationDuration: '60s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: shouldPlay ? 'running' : 'paused',
            '--scroll-distance': `-${scrollDist}px`,
            marginLeft: offset ? '-8%' : undefined,
          } as React.CSSProperties
        }
      >
        <CarouselItems
          isLazy={isLazy}
          charts={charts}
          idPrefix="a"
          rotationOffset={rotationOffset}
        />
        <CarouselItems
          isLazy={isLazy}
          charts={charts}
          idPrefix="b"
          rotationOffset={rotationOffset}
        />
      </div>
    </div>
  );
}

const CarouselItems = memo<{
  isLazy: boolean;
  charts: string[];
  idPrefix: string;
  rotationOffset: number;
}>(function CarouselItems({ isLazy, charts, idPrefix, rotationOffset }) {
  return (
    <>
      {charts.map((syntax, i) => {
        const rotation = ROTATIONS[(i + rotationOffset) % ROTATIONS.length];
        return (
          <div key={i} className="group flex-shrink-0 px-8" style={{ perspective: '800px' }}>
            <div
              className="h-auto rounded-2xl transition-all ease-out duration-500 group-hover:scale-105 group-hover:shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
                transform: rotation,
                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  'rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = rotation;
              }}
            >
              <div className="overflow-clip relative rounded-2xl before:absolute before:inset-0 before:pointer-events-none before:-translate-x-full group-hover:before:animate-[shimmer_1s_forwards] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <div className="h-[250px] w-[380px] flex items-center justify-center overflow-hidden">
                  {!isLazy && (
                    <ChartPreview
                      visSyntax={syntax}
                      chartId={`carousel-${idPrefix}-${i}`}
                      className="!min-h-0 h-full"
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
});

export function Carousel({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const [shouldPlay, setShouldPlay] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShouldPlay(entry.isIntersecting);
        });
      },
      { root: null, rootMargin: '100% 0px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [isLazy, setIsLazy] = useState(true);
  useEffect(() => {
    if (!isLazy || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLazy(false);
          }
        });
      },
      { root: null, rootMargin: '250% 0px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isLazy]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLazy(false);
    }, 20 * 1000);
    return () => clearTimeout(timeout);
  }, []);

  const playing = shouldPlay && !isHovered;

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-24 ${className ?? ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Row charts={row1} shouldPlay={playing} isLazy={isLazy} rotationOffset={0} />
      <Row
        charts={row2}
        shouldPlay={playing}
        isLazy={isLazy}
        offset
        className="hidden md:block"
        rotationOffset={3}
      />
    </div>
  );
}
