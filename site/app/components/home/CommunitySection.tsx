'use client';

import { ArrowUpRight, GitFork, MessageSquare, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from '../../lib/use-in-view';
import { GithubIcon } from '../GithubIcon';
import styles from './community.module.css';

const repository = 'https://github.com/antvis/GPT-Vis';
// Verified with the public GitHub API on 2026-10-30; keep the source date visible offline.
const snapshot = { stars: 794, forks: 96, date: '2026-10-30' };

export function CommunitySection() {
  const { ref, inView } = useInView<HTMLElement>();
  const [stats, setStats] = useState(snapshot);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    void fetch('https://api.github.com/repos/antvis/GPT-Vis', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!Number.isInteger(data.stargazers_count) || !Number.isInteger(data.forks_count)) return;
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          date: new Date().toISOString().slice(0, 10),
        });
        setLive(true);
      })
      .catch(() => {
        /* Keep the dated, verified snapshot when GitHub is unavailable. */
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="community-heading"
      data-visible={inView}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className="site-eyebrow">BUILT IN THE OPEN · AN ANTV PROJECT</p>
          <h2 id="community-heading">
            Your next idea
            <br />
            belongs here, too.
          </h2>
          <p>
            GPT-Vis grows with the people using it. Share a report, suggest a chart, or help build
            the next feature.
          </p>
          <div className={styles.links}>
            <a
              href={repository}
              className="site-button site-button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="size-4" aria-hidden="true" /> Explore on GitHub{' '}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={`${repository}/issues/new/choose`}
              className={styles.issueLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="size-3.5" aria-hidden="true" /> Share an idea{' '}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
          <p className={styles.source}>
            MIT licensed ·{' '}
            <a href={`${repository}/releases`} target="_blank" rel="noopener noreferrer">
              Release notes ↗
            </a>
          </p>
        </div>
        <div className={styles.board}>
          <svg
            className={styles.constellation}
            viewBox="0 0 480 310"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M45 160L112 35L300 58L435 140L365 265L120 275Z"
              stroke="#d6cde2"
              strokeDasharray="4 6"
            />
            {[
              [45, 160],
              [112, 35],
              [300, 58],
              [435, 140],
              [365, 265],
              [120, 275],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4" fill="#c7badb" />
            ))}
          </svg>
          <a
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.starPaper}
          >
            <span className={styles.tape} />
            <div>
              <GithubIcon className="size-4" aria-hidden="true" /> antvis / GPT-Vis
            </div>
            <span className={styles.starLabel}>
              <Star className="size-4" aria-hidden="true" /> GITHUB STARS
            </span>
            <strong data-github-stars>{stats.stars.toLocaleString('en-US')}</strong>
            <p>A little star goes a long way.</p>
            <footer>
              {live ? 'Updated from GitHub' : `GitHub snapshot · ${stats.date}`}{' '}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </footer>
          </a>
          <a
            className={styles.forkSlip}
            href={`${repository}/forks`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitFork className="size-5" aria-hidden="true" />
            <strong data-github-forks>{stats.forks.toLocaleString('en-US')}</strong>
            <span>forks & counting</span>
          </a>
          <div className={styles.ideaSlip} aria-hidden="true">
            <span>THE NEXT CONTRIBUTION</span>
            <strong>Could be yours.</strong>
            <p>an example · a theme · a fix</p>
            <span className={styles.ideaLine} />
            <span className={styles.ideaLine} />
          </div>
          <span className={styles.sticker} aria-hidden="true">
            made
            <br />
            together.
          </span>
        </div>
      </div>
    </section>
  );
}
