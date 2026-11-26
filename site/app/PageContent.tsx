import { ArrowRight, ArrowUpRight, Braces, Sparkles } from 'lucide-react';
import { GenerationDemo } from './components/GenerationDemo';
import { AnalysisShowcase } from './components/home/AnalysisShowcase';
import { AnnotationShowcase } from './components/home/AnnotationShowcase';
import { CommunitySection } from './components/home/CommunitySection';
import { HeroArtwork } from './components/home/HeroArtwork';
import { HeroSlogan } from './components/home/HeroSlogan';
import { IntegrationOptions } from './components/home/IntegrationOptions';
import { Reveal } from './components/home/Reveal';
import { ThemeGallery } from './components/home/ThemeGallery';
import Link from './components/LocaleLink';
import { groupedExamplesData } from './examples/examplesData';
import { annotationsData } from './examples/examplesData/annotations';
import styles from './home.module.css';
import { getTranslator, type Locale } from './lib/i18n';
import { pageMetadata } from './lib/page-metadata';
import { THEME_EXAMPLES } from './themes/examples';

const chartCount = groupedExamplesData.flatMap((group) => group.charts).length;
const analysisCount = annotationsData.examples.length;

export const pageMetadataFor = (locale: Locale) =>
  pageMetadata({
    locale,
    title: 'GPT-Vis — Turn AI answers into charts.',
    description: getTranslator(locale)(
      'An open-source visualization library for AI agents and applications. Render {charts} chart types from JSON or Syntax, explain findings with {annotations} analysis capabilities, and customize themes.',
      { charts: chartCount, annotations: analysisCount },
    ),
    path: '/',
  });

export default function Home({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroCopy}>
          <Link href="/docs/agent-skill" className={styles.announcement}>
            <span className={styles.newBadge}>{t('AGENT SKILL')}</span>
            {t('Chart selection, generation, and styling.')}{' '}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
          <p className={styles.eyebrow}>{t('OPEN-SOURCE VISUALIZATION FOR AI')}</p>
          <HeroSlogan />
          <p className={styles.heroDescription}>
            {t(
              'Ask your assistant for a chart, or bring live visualizations into your app. Render',
            )}{' '}
            {THEME_EXAMPLES.length}{' '}
            {t(
              'visualization types as your model responds, from statistical charts to relationship graphs, tables, and summaries. Style them all with one theme.',
            )}{' '}
          </p>
          <div className={styles.actions}>
            <a href="#integrate" className={styles.primaryButton}>
              {t('Use with your agent')} <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <Link href="/docs/quickstart" className={styles.secondaryButton}>
              {t('Build with the SDK')} <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <p className={styles.heroFootnote}>
            {t('Use in desktop assistants, coding agents, and editors that support Skills.')}{' '}
          </p>
        </div>
        <HeroArtwork />
      </section>
      <div className={styles.proofStrip}>
        <span>
          <strong>{THEME_EXAMPLES.length}</strong> {t('chart types')}{' '}
        </span>
        <span>
          <Braces className="size-4" aria-hidden="true" />
          Syntax & JSON
        </span>
        <span>
          <Sparkles className="size-4" aria-hidden="true" />
          {t('Agent Skill included')}{' '}
        </span>
        <span>
          {t('Built on')} <strong>G2 · G6 · T8</strong>
        </span>
      </div>
      <section className={styles.section} id="integrate" aria-labelledby="integrate-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>{t('01 / GET STARTED')}</p>
            <h2 id="integrate-heading">
              {t('Your agent.')} <br />
              {t('Now with charts.')}{' '}
            </h2>
          </div>
          <p>
            {t(
              'Ask your agent to pick a chart, generate its configuration, or build a reusable theme. Or bring the rendering SDK into your application.',
            )}{' '}
          </p>
        </div>
        <Reveal>
          <IntegrationOptions />
        </Reveal>
      </section>
      <section className={styles.section} id="streaming" aria-labelledby="streaming-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>{t('02 / BUILT FOR MODEL OUTPUT')}</p>
            <h2 id="streaming-heading">
              {t('The answer streams in.')} <br />
              {t('The chart takes shape.')}{' '}
            </h2>
          </div>
          <p>
            {t(
              'Keep passing the accumulated output to render(). GPT-Vis updates the chart as more data arrives. Switch between Syntax and JSON below to compare the two formats.',
            )}{' '}
          </p>
        </div>
        <Reveal>
          <GenerationDemo />
        </Reveal>
        <p className="mt-5 text-sm text-on-surface-variant">
          {t('This is a simulated response using fixed sample data.')}{' '}
          <Link href="/docs/streaming" className="site-text-link">
            {t('Read the streaming guide →')}{' '}
          </Link>
        </p>
      </section>
      <section className={styles.section} id="ava" aria-labelledby="ava-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>{t('AVA / ANALYSIS')}</p>
            <h2 id="ava-heading">
              {t('Ask a question.')} <br />
              {t('See the evidence.')}
            </h2>
          </div>
          <p>
            {t(
              'Follow the path from source data to a visual answer. AVA calculates the result and recommends a chart; GPT-Vis renders it in your interface. Inspect the values, keep the JSON, and see where each finding comes from.',
            )}
          </p>
        </div>
        <Reveal>
          <AnalysisShowcase />
        </Reveal>
      </section>
      <section className={styles.upcoming} id="analysis" aria-labelledby="analysis-heading">
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>{t('03 / ANALYSIS, MADE VISIBLE')}</p>
              <h2 id="analysis-heading">
                {t('From data points.')} <br />
                {t('To a clearer story.')}
              </h2>
            </div>
            <p>
              {t(
                '{count} analysis capabilities, built into your charts. Find turning points, compare against a target, or show what contributes most. Each finding stays connected to the data and configuration behind it.',
                { count: analysisCount },
              )}
            </p>
          </div>
          <AnnotationShowcase />
          <div className={styles.analysisFooter}>
            <span>
              {t('{charts} visualizations. {annotations} ways to bring the findings into focus.', {
                charts: chartCount,
                annotations: analysisCount,
              })}
            </span>
            <Link href="/examples/annotations" className={styles.secondaryButton}>
              {t('Explore analysis capabilities')}{' '}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.appearance} id="themes" aria-labelledby="themes-heading">
        <div className={styles.section}>
          <span id="charts" />
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>{t('APPEARANCE / MAKE IT YOURS')}</p>
              <h2 id="themes-heading">
                {t('Charts that match')} <br />
                {t('your style.')}{' '}
              </h2>
            </div>
            <p>
              {t(
                'GPT-Vis supports theme configuration for colors, fonts, and chart styles. Try a gallery preset below, or create a theme from your brand, slides, or UI in Studio.',
              )}{' '}
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
          <p>{t('Visualization for AI agents and applications.')}</p>
        </div>
        <nav aria-label={t('Footer navigation')}>
          <Link href="/docs/agent-skill">Agent Skill</Link>
          <Link href="/docs">{t('Documentation')}</Link>
          <Link href="/examples">{t('Examples')}</Link>
          <Link href="/themes">{t('Theme Studio')}</Link>
          <a href="https://github.com/antvis/GPT-Vis" target="_blank" rel="noopener noreferrer">
            {t('GitHub ↗')}{' '}
          </a>
          <a
            href="https://github.com/antvis/GPT-Vis/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Issues ↗')}{' '}
          </a>
        </nav>
        <p className={styles.copyright}>{t('An open-source project by AntV. MIT License.')}</p>
      </footer>
    </main>
  );
}
