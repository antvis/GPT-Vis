import { ArrowRight, ArrowUpRight, Braces, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { GenerationDemo } from './components/GenerationDemo';
import { AnalysisShowcase } from './components/home/AnalysisShowcase';
import { CommunitySection } from './components/home/CommunitySection';
import { HeroArtwork } from './components/home/HeroArtwork';
import { HeroSlogan } from './components/home/HeroSlogan';
import { IntegrationOptions } from './components/home/IntegrationOptions';
import { Reveal } from './components/home/Reveal';
import { RoadmapIllustration } from './components/home/RoadmapIllustration';
import { ThemeGallery } from './components/home/ThemeGallery';
import styles from './home.module.css';
import { pageMetadata } from './lib/page-metadata';
import { THEME_EXAMPLES } from './themes/examples';

export const metadata = pageMetadata({
  title: 'GPT-Vis — Turn AI answers into charts.',
  description:
    'An open-source visualization library for AI agents and applications. Render 26 chart types from JSON or Syntax, stream model output, and customize chart styles with theme configuration.',
  path: '/',
});

const next = [
  {
    kind: 'annotations' as const,
    title: 'Make the point.',
    text: 'Highlight a value, add a target line, or mark the period that matters.',
    label: 'Annotations',
  },
  {
    kind: 'statistics' as const,
    title: 'Show the range.',
    text: 'Display precomputed statistics, error bars, and bands alongside your data.',
    label: 'Statistical expression',
  },
  {
    kind: 'selection' as const,
    title: 'Explore the detail.',
    text: 'Compare groups in facets and return selections to your application.',
    label: 'Facets & selection',
  },
];

export default function Home() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroCopy}>
          <Link href="/docs/agent-skill" className={styles.announcement}>
            <span className={styles.newBadge}>AGENT SKILL</span>Chart selection, generation, and
            styling.
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
          <p className={styles.eyebrow}>OPEN-SOURCE VISUALIZATION FOR AI</p>
          <HeroSlogan />
          <p className={styles.heroDescription}>
            Ask your assistant for a chart, or bring live visualizations into your app. Render{' '}
            {THEME_EXAMPLES.length} visualization types as your model responds, from statistical
            charts to relationship graphs, tables, and summaries. Style them all with one theme.
          </p>
          <div className={styles.actions}>
            <a href="#integrate" className={styles.primaryButton}>
              Use with your agent <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <Link href="/docs/quickstart" className={styles.secondaryButton}>
              Build with the SDK <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <p className={styles.heroFootnote}>
            Use in desktop assistants, coding agents, and editors that support Skills.
          </p>
        </div>
        <HeroArtwork />
      </section>
      <div className={styles.proofStrip}>
        <span>
          <strong>{THEME_EXAMPLES.length}</strong> chart types
        </span>
        <span>
          <Braces className="size-4" aria-hidden="true" />
          Syntax & JSON
        </span>
        <span>
          <Sparkles className="size-4" aria-hidden="true" />
          Agent Skill included
        </span>
        <span>
          Built on <strong>G2 · G6 · T8</strong>
        </span>
      </div>
      <section className={styles.section} id="integrate" aria-labelledby="integrate-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>01 / GET STARTED</p>
            <h2 id="integrate-heading">
              Your agent.
              <br />
              Now with charts.
            </h2>
          </div>
          <p>
            Ask your agent to pick a chart, generate its configuration, or build a reusable theme.
            Or bring the rendering SDK into your application.
          </p>
        </div>
        <Reveal>
          <IntegrationOptions />
        </Reveal>
      </section>
      <section className={styles.section} id="streaming" aria-labelledby="streaming-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>02 / BUILT FOR MODEL OUTPUT</p>
            <h2 id="streaming-heading">
              The answer streams in.
              <br />
              The chart takes shape.
            </h2>
          </div>
          <p>
            Keep passing the accumulated output to render(). GPT-Vis updates the chart as more data
            arrives. Switch between Syntax and JSON below to compare the two formats.
          </p>
        </div>
        <Reveal>
          <GenerationDemo />
        </Reveal>
        <p className="mt-5 text-sm text-on-surface-variant">
          This is a simulated response using fixed sample data.{' '}
          <Link href="/docs/streaming" className="site-text-link">
            Read the streaming guide →
          </Link>
        </p>
      </section>
      <section className={styles.upcoming} id="analysis" aria-labelledby="analysis-heading">
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>03 / ANALYSIS, MADE VISIBLE</p>
              <h2 id="analysis-heading">
                Ask a question.
                <br />
                See the evidence.
              </h2>
            </div>
            <p>
              Follow the path from source data to a visual answer. AVA calculates the result and
              recommends a chart; GPT-Vis renders it in your interface. Inspect the values, keep the
              JSON, and see where each finding comes from.
            </p>
          </div>
          <Reveal>
            <AnalysisShowcase />
          </Reveal>
          <div className={styles.roadmapIntro}>
            <div>
              <p className={styles.eyebrow}>
                WHAT’S NEXT <span className={styles.comingSoon}>COMING SOON</span>
              </p>
              <h3 id="upcoming-heading">Give each finding more room to speak.</h3>
            </div>
            <p>
              Next, we’re adding ways to mark a finding, show a statistical range, and select data
              for further analysis in your app.
            </p>
          </div>
          <div className={styles.roadmapGrid}>
            {next.map(({ kind, title, text, label }) => (
              <article key={label}>
                <RoadmapIllustration kind={kind} />
                <h3>{title}</h3>
                <p>{text}</p>
                <span>{label} · Coming soon</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.appearance} id="themes" aria-labelledby="themes-heading">
        <div className={styles.section}>
          <span id="charts" />
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>APPEARANCE / MAKE IT YOURS</p>
              <h2 id="themes-heading">
                Charts that match
                <br />
                your style.
              </h2>
            </div>
            <p>
              GPT-Vis supports theme configuration for colors, fonts, and chart styles. Try a
              gallery preset below, or create a theme from your brand, slides, or UI in Studio.
            </p>
          </div>
          <Reveal>
            <ThemeGallery />
          </Reveal>
        </div>
      </section>
      <CommunitySection />
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Link href="/">
            <strong>GPT-Vis</strong>
          </Link>
          <p>Visualization for AI agents and applications.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/docs/agent-skill">Agent Skill</Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/examples">Examples</Link>
          <Link href="/themes">Theme Studio</Link>
          <a href="https://github.com/antvis/GPT-Vis" target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a
            href="https://github.com/antvis/GPT-Vis/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issues ↗
          </a>
        </nav>
        <p className={styles.copyright}>An open-source project by AntV. MIT License.</p>
      </footer>
    </main>
  );
}
