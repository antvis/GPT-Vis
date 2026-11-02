'use client';

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
import Link from 'next/link';
import { useState } from 'react';
import {
  FIRST_CHART_PROMPT,
  SKILL_GITHUB_URL,
  SKILL_INSTALL_COMMAND,
  SKILL_INSTALL_PROMPT,
} from '../../lib/skill-installation';
import { CopyAction } from '../CopyAction';
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
  const [method, setMethod] = useState('skill');
  return (
    <div className={styles.panel}>
      <div className={styles.tabs} role="group" aria-label="Ways to use GPT-Vis">
        <button type="button" aria-pressed={method === 'skill'} onClick={() => setMethod('skill')}>
          <Bot className="size-4" aria-hidden="true" /> Agent Skill
        </button>
        <button type="button" aria-pressed={method === 'sdk'} onClick={() => setMethod('sdk')}>
          <Code2 className="size-4" aria-hidden="true" /> JavaScript / TypeScript SDK
        </button>
        <span className={styles.tabsNote}>YOUR MODEL. YOUR WORKFLOW.</span>
      </div>
      {method === 'skill' ? (
        <div className={styles.skillBody}>
          <div className={styles.setup}>
            <span className="site-eyebrow">INSTALL ONCE. KEEP CREATING.</span>
            <h3>Start in your assistant.</h3>
            <p>Install the Skill, then give your assistant its first chart task.</p>
            <div className={styles.desktopRoutes}>
              {[
                {
                  label: 'DESKTOP & PERSONAL ASSISTANTS',
                  kind: 'assistants',
                  clients: assistantClients,
                },
                { label: 'CODING AGENTS', kind: 'coding', clients: codingClients },
              ].map(({ label, kind, clients }) => (
                <div className={styles.clientGroup} key={label}>
                  <span className={styles.clientGroupLabel}>{label}</span>
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
                <p>Copy the installation prompt and paste it into your assistant to get started.</p>
              </div>
              <CopyAction
                text={SKILL_INSTALL_PROMPT}
                label="Copy installation prompt"
                className="site-button-primary"
              />
              <details className={styles.promptDetails}>
                <summary>Read the prompt</summary>
                <pre tabIndex={0} aria-label="Desktop Skill installation prompt">
                  <code>{SKILL_INSTALL_PROMPT}</code>
                </pre>
              </details>
              <div className={styles.routeHint}>
                <p>
                  If your assistant cannot install from a link, download the ZIP and import it in
                  its Skills settings.
                </p>
                <a href="/downloads/chart-visualization.zip" download>
                  <Download className="size-3.5" aria-hidden="true" /> Download Skill ZIP
                </a>
              </div>
              <details className={styles.routeDetails}>
                <summary>Upload steps & terminal install</summary>
                <p>
                  <strong>WorkBuddy:</strong> Skills → Add Skill → Upload Skill.
                </p>
                <p>
                  <strong>Claude Chat / Cowork:</strong> Customize → Skills → Create skill → Upload
                  a skill. Enable it after upload.
                </p>
                <p>
                  <strong>Terminal:</strong> Run in your project folder, then choose your agent.
                </p>
                <pre tabIndex={0} aria-label="Skill installation command">
                  <code>{SKILL_INSTALL_COMMAND}</code>
                </pre>
                <CopyAction text={SKILL_INSTALL_COMMAND} label="Copy install command" />
              </details>
              <div className={styles.guideLinks}>
                <Link href="/docs/agent-skill#desktop-assistants">
                  Client setup guides <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
                <a href={SKILL_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  Skill source <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <section className={styles.firstTask} aria-labelledby="first-task-heading">
              <h4 id="first-task-heading">Make your first report.</h4>
              <p>Try a monthly revenue report with a line chart, a table, and one shared theme.</p>
              <div className={styles.taskData} aria-label="Sample monthly revenue in US dollars">
                {[
                  ['Jan', '$12,000'],
                  ['Feb', '$18,000'],
                  ['Mar', '$15,000'],
                  ['Apr', '$24,000'],
                ].map(([month, value]) => (
                  <span key={month}>
                    <small>{month}</small>
                    <strong>{value}</strong>
                  </span>
                ))}
              </div>
              <CopyAction text={FIRST_CHART_PROMPT} label="Copy your first task" />
              <details className={styles.promptDetails}>
                <summary>Read the task</summary>
                <pre tabIndex={0} aria-label="First report task">
                  <code>{FIRST_CHART_PROMPT}</code>
                </pre>
              </details>
            </section>
          </div>
          <aside className={styles.workflow}>
            <div className={styles.workflowArt} aria-hidden="true">
              <span className={styles.artNote}>one more thing your agent can do ↗</span>
              <div className={styles.skillPaper}>
                <span className={styles.tape} />
                <div>
                  <Sparkles className="size-4" /> chart-visualization
                </div>
                <strong>
                  Good questions.
                  <br />
                  Better charts.
                </strong>
                <span className={styles.skillRow}>
                  <Check /> Pick the right chart
                </span>
                <span className={styles.skillRow}>
                  <Check /> Generate JSON or Syntax
                </span>
                <span className={styles.skillRow}>
                  <Check /> Match your visual style
                </span>
                <footer>SKILL.md + references</footer>
              </div>
              <div className={styles.outputPaper}>
                <span>
                  <FileJson2 className="size-3.5" /> YOUR FIRST REPORT
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
                26 ways
                <br />
                to show it.
              </span>
            </div>
            <FirstReportPreview />
          </aside>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.description}>
            <span className="site-eyebrow">BUILD INTO YOUR APP</span>
            <h3>A small API. Your choice of stack.</h3>
            <p>
              Render JSON or Syntax in the browser. Reuse themes across charts and update the same
              instance as model output arrives.
            </p>
            <Link href="/docs/quickstart" className="site-text-link">
              SDK quickstart <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.detail}>
            <pre>
              <code>npm install @antv/gpt-vis</code>
            </pre>
            <CopyAction text="npm install @antv/gpt-vis" label="Copy install command" />
            <pre>
              <code>{`import { GPTVis } from '@antv/gpt-vis';\n\nconst chart = new GPTVis({ container: '#chart' });\nchart.render({\n  type: 'column',\n  data: [\n    { category: 'Jan', value: 120 },\n    { category: 'Feb', value: 180 },\n  ],\n});`}</code>
            </pre>
          </div>
        </div>
      )}
      <footer>
        Using MCP?{' '}
        <a
          href="https://github.com/antvis/mcp-server-chart"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore the AntV chart MCP server ↗
        </a>
        <span>React · Vue · Markdown · shadcn/ui</span>
      </footer>
    </div>
  );
}
