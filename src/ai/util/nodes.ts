/**
 * Custom HTML node rendering utilities using JSS for styling
 */
import { create } from 'jss';

// Create JSS instance
const jss = create();

// Define styles for OrganizationChart nodes
const orgChartNodeStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#fff',
    border: '1px solid #e8e8e8',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minWidth: '240px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      borderColor: '#1890ff',
    },
    '&.active': {
      borderColor: '#1890ff',
      boxShadow: '0 4px 12px rgba(24,144,255,0.2)',
    },
  },
  name: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#262626',
    marginBottom: '4px',
  },
  position: {
    fontSize: '12px',
    color: '#8c8c8c',
  },
};

// Define styles for Flow Diagram text nodes
const flowNodeStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    backgroundColor: '#fff',
    border: '2px solid #1890ff',
    borderRadius: '4px',
    minWidth: '120px',
    minHeight: '32px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: '#e6f7ff',
      borderColor: '#40a9ff',
    },
    '&.active': {
      backgroundColor: '#bae7ff',
      borderColor: '#001f98',
    },
  },
  text: {
    fontSize: '12px',
    color: '#262626',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
};

// Create stylesheets
const orgChartSheet = jss.createStyleSheet(orgChartNodeStyles);
const flowNodeSheet = jss.createStyleSheet(flowNodeStyles);

// Attach stylesheets to DOM
orgChartSheet.attach();
flowNodeSheet.attach();

/**
 * Render OrganizationChart node HTML
 */
export function renderOrgChartNode(data: {
  name: string;
  description?: string;
  isActive?: boolean;
}): string {
  const { name, description, isActive } = data;
  const classes = orgChartSheet.classes;

  return `
    <div class="${classes.container}${isActive ? ' active' : ''}">
      <div class="${classes.name}">${name}</div>
      ${description ? `<div class="${classes.position}">${description}</div>` : ''}
    </div>
  `;
}

/**
 * Render Flow Diagram text node HTML
 */
export function renderFlowTextNode(data: { text: string; isActive?: boolean }): string {
  const { text, isActive } = data;
  const classes = flowNodeSheet.classes;

  return `
    <div class="${classes.container}${isActive ? ' active' : ''}">
      <div class="${classes.text}">${text}</div>
    </div>
  `;
}

/**
 * Clean up JSS stylesheets
 */
export function cleanupNodeStyles(): void {
  orgChartSheet.detach();
  flowNodeSheet.detach();
}
