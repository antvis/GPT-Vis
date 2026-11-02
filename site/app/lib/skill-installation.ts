export const SKILL_GITHUB_URL =
  'https://github.com/antvis/GPT-Vis/tree/ai/skills/chart-visualization';

export const SKILL_INSTALL_PROMPT = `Install GPT-Vis's chart-visualization skill for the assistant I am using.

Source: ${SKILL_GITHUB_URL}

Use this assistant's supported skill installation location. Download the complete chart-visualization directory from the ai branch, including SKILL.md and all references. If using the skills installer, select only chart-visualization.

Read the installed SKILL.md, verify that its reference files are present, and report the installation location and whether a new session is needed. If this assistant requires a manual upload or cannot install from a link, explain that instead of claiming success.`;

export const SKILL_INSTALL_COMMAND =
  'npx skills add https://github.com/antvis/GPT-Vis/tree/ai --skill chart-visualization';

export const FIRST_CHART_PROMPT = `Use the GPT-Vis chart-visualization skill to create a monthly revenue report from these values (USD): Jan 12000, Feb 18000, Mar 15000, Apr 24000.

Include a line chart, a table with the same four values, and a short summary of the total revenue and April's change from March. Calculate the figures from the supplied data.

Use a shared theme configuration for the chart and table. Create report.html that I can open directly in a browser, with the theme embedded and any published library dependencies loaded. Also save the same theme configuration as theme.json so I can reuse it. No build step should be needed.`;
