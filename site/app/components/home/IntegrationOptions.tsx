'use client';

import { useTranslation } from '../I18nProvider';

import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Download,
  FileJson2,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  FIRST_CHART_PROMPT,
  SKILL_GITHUB_URL,
  SKILL_INSTALL_COMMAND,
  SKILL_INSTALL_PROMPT,
} from '../../lib/skill-installation';
import { CopyAction } from '../CopyAction';
import Link from '../LocaleLink';
import { FirstReportPreview } from './FirstReportPreview';
import styles from './integration.module.css';

const assistantClients = [
  { name: 'ChatGPT desktop', icon: 'openai' },
  { name: 'Claude', icon: 'claude' },
  { name: 'QwenWork', icon: 'qwenwork' },
  { name: 'WorkBuddy', icon: 'workbuddy' },
  { name: 'QoderWork', icon: 'qoder' },
  { name: 'OpenClaw', icon: 'openclaw' },
];
const codingClients = [
  { name: 'Codex', icon: 'codex' },
  { name: 'Cursor', icon: 'cursor' },
  { name: 'Claude Code', icon: 'claude' },
  { name: 'Gemini CLI', icon: 'gemini-cli' },
];

export function IntegrationOptions() {
  const t = useTranslation();
  const [method, setMethod] = useState('skill');
  return (
    <div className={styles.panel}>
      <div className={styles.tabs} role="group" aria-label={t('Ways to use GPT-Vis')}>
        <button type="button" aria-pressed={method === 'skill'} onClick={() => setMethod('skill')}>
          <Bot className="size-4" aria-hidden="true" /> Agent Skill
        </button>
        <button type="button" aria-pressed={method === 'sdk'} onClick={() => setMethod('sdk')}>
          <Code2 className="size-4" aria-hidden="true" /> JavaScript / TypeScript SDK
        </button>
        <span className={styles.tabsNote}>{t('YOUR MODEL. YOUR WORKFLOW.')}</span>
      </div>
      {method === 'skill' ? (
        <div className={styles.skillBody}>
          <div className={styles.setup}>
            <span className="site-eyebrow">{t('INSTALL ONCE. KEEP CREATING.')}</span>
            <h3>{t('Start in your assistant.')}</h3>
            <p>{t('Install the Skill, then give your assistant its first chart task.')}</p>
            <div className={styles.desktopRoutes}>
              {[
                {
                  label: t('DESKTOP & PERSONAL ASSISTANTS'),
                  kind: 'assistants',
                  clients: assistantClients,
                },
                { label: t('CODING AGENTS'), kind: 'coding', clients: codingClients },
              ].map(({ label, kind, clients }) => (
                <div className={styles.clientGroup} key={t(label)}>
                  <span className={styles.clientGroupLabel}>{t(label)}</span>
                  <div className={styles.clientList} data-kind={kind}>
                    {clients.map(({ name, icon }) => (
                      <span className={styles.clientName} key={name}>
                        <Image src={`/agents/${icon}.svg`} alt="" width={18} height={18} />
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className={styles.routeHint}>
                <p>
                  {t(
                    'Copy the installation prompt and paste it into your assistant to get started.',
                  )}
                </p>
              </div>
              <CopyAction
                text={t(SKILL_INSTALL_PROMPT)}
                label={t('Copy installation prompt')}
                className="site-button-primary"
              />
              <details className={styles.promptDetails}>
                <summary>{t('Read the prompt')}</summary>
                <pre tabIndex={0} aria-label={t('Desktop Skill installation prompt')}>
                  <code>{t(SKILL_INSTALL_PROMPT)}</code>
                </pre>
              </details>
              <div className={styles.routeHint}>
                <p>
                  {t(
                    'If your assistant cannot install from a link, download the ZIP and import it in its Skills settings.',
                  )}{' '}
                </p>
                <a href="/downloads/chart-visualization.zip" download>
                  <Download className="size-3.5" aria-hidden="true" />{' '}
                  {t('Download Skill ZIP')}{' '}
                </a>
              </div>
              <details className={styles.routeDetails}>
                <summary>{t('Upload steps & terminal install')}</summary>
                <p>
                  <strong>WorkBuddy:</strong> {t('Skills → Add Skill → Upload Skill.')}{' '}
                </p>
                <p>
                  <strong>Claude Chat / Cowork:</strong>{' '}
                  {t(
                    'Customize → Skills → Create skill → Upload a skill. Enable it after upload.',
                  )}{' '}
                </p>
                <p>
                  <strong>{t('Terminal:')}</strong>{' '}
                  {t('Run in your project folder, then choose your agent.')}{' '}
                </p>
                <pre tabIndex={0} aria-label={t('Skill installation command')}>
                  <code>{SKILL_INSTALL_COMMAND}</code>
                </pre>
                <CopyAction text={SKILL_INSTALL_COMMAND} label={t('Copy install command')} />
              </details>
              <div className={styles.guideLinks}>
                <Link href="/docs/agent-skill#desktop-assistants">
                  {t('Client setup guides')}{' '}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
                <a href={SKILL_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  {t('Skill source')} <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <section className={styles.firstTask} aria-labelledby="first-task-heading">
              <h4 id="first-task-heading">{t('Make your first report.')}</h4>
              <p>
                {t(
                  'Try a monthly revenue report with a line chart, a table, and one shared theme.',
                )}
              </p>
              <div
                className={styles.taskData}
                aria-label={t('Sample monthly revenue in US dollars')}
              >
                {[
                  ['Jan', '$12,000'],
                  ['Feb', '$18,000'],
                  ['Mar', '$15,000'],
                  ['Apr', '$24,000'],
                ].map(([month, value]) => (
                  <span key={month}>
                    <small>{t(month)}</small>
                    <strong>{value}</strong>
                  </span>
                ))}
              </div>
              <CopyAction text={t(FIRST_CHART_PROMPT)} label={t('Copy your first task')} />
              <details className={styles.promptDetails}>
                <summary>{t('Read the task')}</summary>
                <pre tabIndex={0} aria-label={t('First report task')}>
                  <code>{t(FIRST_CHART_PROMPT)}</code>
                </pre>
              </details>
            </section>
          </div>
          <aside className={styles.workflow}>
            <div className={styles.workflowArt} aria-hidden="true">
              <span className={styles.artNote}>{t('one more thing your agent can do ↗')}</span>
              <div className={styles.skillPaper}>
                <span className={styles.tape} />
                <div>
                  <Sparkles className="size-4" /> chart-visualization
                </div>
                <strong>
                  {t('Good questions.')} <br />
                  {t('Better charts.')}{' '}
                </strong>
                <span className={styles.skillRow}>
                  <Check /> {t('Pick the right chart')}{' '}
                </span>
                <span className={styles.skillRow}>
                  <Check /> {t('Generate JSON or Syntax')}{' '}
                </span>
                <span className={styles.skillRow}>
                  <Check /> {t('Match your visual style')}{' '}
                </span>
                <footer>{t('SKILL.md + references')}</footer>
              </div>
              <div className={styles.outputPaper}>
                <span>
                  <FileJson2 className="size-3.5" /> {t('YOUR FIRST REPORT')}{' '}
                </span>
                <div className={styles.miniBars}>
                  {[36, 54, 45, 72].map((height, i) => (
                    <i key={i} style={{ height }} />
                  ))}
                </div>
                <footer>
                  <span>report.html</span>
                  <span>theme.json</span>
                </footer>
              </div>
              <span className={styles.skillSticker}>
                {t('26 ways')} <br />
                {t('to show it.')}{' '}
              </span>
            </div>
            <FirstReportPreview />
          </aside>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.description}>
            <span className="site-eyebrow">{t('BUILD INTO YOUR APP')}</span>
            <h3>{t('A small API. Your choice of stack.')}</h3>
            <p>
              {t(
                'Render JSON or Syntax in the browser. Reuse themes across charts and update the same instance as model output arrives.',
              )}{' '}
            </p>
            <Link href="/docs/quickstart" className="site-text-link">
              {t('SDK quickstart')} <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.detail}>
            <pre>
              <code>npm install @antv/gpt-vis</code>
            </pre>
            <CopyAction text="npm install @antv/gpt-vis" label={t('Copy install command')} />
            <pre>
              <code>{`import { GPTVis } from '@antv/gpt-vis';\n\nconst chart = new GPTVis({ container: '#chart' });\nchart.render({\n  type: 'column',\n  data: [\n    { category: 'Jan', value: 120 },\n    { category: 'Feb', value: 180 },\n  ],\n});`}</code>
            </pre>
          </div>
        </div>
      )}
      <footer>
        {t('Using MCP?')}{' '}
        <a
          href="https://github.com/antvis/mcp-server-chart"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Explore the AntV chart MCP server ↗')}{' '}
        </a>
        <span>React · Vue · Markdown · shadcn/ui</span>
      </footer>
    </div>
  );
}
