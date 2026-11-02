export const docs = [
  {
    slug: 'introduction',
    title: 'Introduction',
    group: 'Get started',
    description: 'Charts for AI agents and applications.',
  },
  {
    slug: 'agent-skill',
    title: 'Agent Skill',
    group: 'Get started',
    description: 'Install the skill and create your first chart with your agent.',
  },
  {
    slug: 'quickstart',
    title: 'SDK quickstart',
    group: 'Get started',
    description: 'Install GPT-Vis and render a chart in JavaScript or TypeScript.',
  },
  {
    slug: 'syntax',
    title: 'JSON & Syntax',
    group: 'Chart configuration',
    description: 'Describe charts with structured JSON or readable Syntax.',
  },
  {
    slug: 'charts',
    title: 'Chart types',
    group: 'Chart configuration',
    description: 'Find a chart for your data and explore its options.',
  },
  {
    slug: 'streaming',
    title: 'Streaming rendering',
    group: 'Chart configuration',
    description: 'Update a chart as model output arrives.',
  },
  {
    slug: 'themes',
    title: 'Themes & styles',
    group: 'Appearance',
    description: 'Apply a shared theme to charts, graphs, tables, and summaries.',
  },
  {
    slug: 'styles',
    title: 'Chart styling',
    group: 'Appearance',
    description: 'Override one chart and understand how local styles affect shared themes.',
  },
  {
    slug: 'integrations/frameworks',
    title: 'React & Vue',
    group: 'Integration',
    description: 'Mount, update, and destroy charts in your framework.',
  },
  {
    slug: 'integrations/markdown',
    title: 'Markdown',
    group: 'Integration',
    description: 'Render visualization code fences in Markdown content.',
  },
  {
    slug: 'integrations/shadcn',
    title: 'shadcn/ui',
    group: 'Integration',
    description: 'Copy typed React chart components into your application.',
  },
  {
    slug: 'integrations/ecosystem',
    title: 'MCP & ecosystem',
    group: 'Integration',
    description: 'Connect chart tools and explore related packages.',
  },
  {
    slug: 'reference/theme-spec',
    title: 'Theme configuration',
    group: 'Reference',
    description: 'Shared tokens, supported style blocks, and chart-specific theme overrides.',
  },
  {
    slug: 'reference/api',
    title: 'GPTVis API',
    group: 'Reference',
    description: 'Constructor options, rendering, and instance cleanup.',
  },
] as const;

export type Doc = (typeof docs)[number];
export function docHref(slug: string) {
  return slug === 'introduction' ? '/docs' : `/docs/${slug}`;
}

export const legacyDocLinks: Record<string, string> = {
  'getting-started': '/docs',
  installation: '/docs/quickstart#install',
  'quick-start': '/docs/quickstart',
  'api-reference': '/docs/reference/api',
  streaming: '/docs/streaming',
  visualization: '/docs/syntax',
  'json-config': '/docs/syntax#json-config',
  components: '/docs/charts',
  'style-config': '/docs/styles',
  themes: '/docs/themes#themes',
  'custom-themes': '/docs/themes#custom-themes',
  palette: '/docs/styles#palette',
  integration: '/docs/agent-skill',
  skill: '/docs/agent-skill',
  'skill-terminal': '/docs/agent-skill#terminal-installation',
  'markdown-integration': '/docs/integrations/markdown',
  framework: '/docs/integrations/frameworks',
  shadcn: '/docs/integrations/shadcn',
  ecosystem: '/docs/integrations/ecosystem',
};
