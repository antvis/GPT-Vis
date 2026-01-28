/**
 * Darken hex color
 */
function darkenHexColor(hex: string, amount: number = 20): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/**
 * Convert hex to rgba
 */
function hexToRgba(hex: string, alpha: number = 1): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = num >> 16;
  const g = (num >> 8) & 0x00ff;
  const b = num & 0x0000ff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Measure text width
 */
function measureTextWidth(text: string, font: any = {}): number {
  const { fontSize = 14, fontFamily = 'PingFang SC, sans-serif', fontWeight = 400 } = font;
  
  if (typeof document === 'undefined') return text.length * fontSize * 0.6;
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return text.length * fontSize * 0.6;
  
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = context.measureText(text);
  return metrics.width;
}

export interface TextNodeOptions {
  type?: 'normal' | 'filled' | 'outlined' | 'underlined';
  text?: string;
  color?: string;
  maxWidth?: number;
  borderWidth?: number;
  font?: {
    fontFamily?: string;
    fontSize?: number | string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: number | string;
  };
  isActive?: boolean;
  isSelected?: boolean;
}

/**
 * Create TextNode HTML element
 */
export function createTextNode(options: TextNodeOptions): HTMLElement {
  const {
    type = 'normal',
    text = '',
    font = {},
    color = '#1783ff',
    borderWidth = 3,
    maxWidth = Infinity,
    isActive = false,
    isSelected = false,
  } = options;

  const wrapper = document.createElement('div');
  wrapper.className = `text-node text-node-${type}`;
  
  // Base styles
  Object.assign(wrapper.style, {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowWrap: 'anywhere',
    lineHeight: '1.5em',
    textAlign: 'center',
    height: 'inherit',
    width: 'inherit',
    boxSizing: 'content-box',
    fontSize: '14px',
    ...font,
  });

  // Type-specific styles
  switch (type) {
    case 'normal':
      wrapper.style.color = color;
      break;
    case 'filled':
      wrapper.style.color = '#fff';
      wrapper.style.backgroundColor = color;
      wrapper.style.borderRadius = '8px';
      break;
    case 'outlined':
      wrapper.style.height = `calc(100% - ${2 * borderWidth}px)`;
      wrapper.style.width = `calc(100% - ${2 * borderWidth}px)`;
      wrapper.style.color = color;
      wrapper.style.backgroundColor = '#fff';
      wrapper.style.border = `${borderWidth}px solid ${color}`;
      wrapper.style.borderRadius = '8px';
      break;
    case 'underlined':
      wrapper.style.height = `calc(100% - ${borderWidth / 2}px)`;
      wrapper.style.width = 'inherit';
      wrapper.style.borderBottom = `${borderWidth}px solid ${color}`;
      wrapper.style.backgroundColor = '#fff';
      wrapper.style.color = color;
      break;
  }

  // Active/selected states
  if (isActive || isSelected) {
    wrapper.style.height = `calc(100% - ${2 * borderWidth}px)`;
    wrapper.style.width = `calc(100% - ${2 * borderWidth}px)`;
    wrapper.style.border = `${borderWidth}px solid ${darkenHexColor(color, 100)}`;
    if (isSelected) {
      wrapper.style.boxShadow = `0 0 0 2px ${hexToRgba(color, 0.1)}`;
    }
  }

  const isMultiLine = measureTextWidth(text, font) > maxWidth;
  const textDiv = document.createElement('div');
  if (isMultiLine) {
    textDiv.style.width = 'calc(100% - 12px)';
  }
  textDiv.textContent = text;
  wrapper.appendChild(textDiv);

  return wrapper;
}

export interface OrganizationChartNodeOptions {
  name: string;
  position: string;
  status?: 'online' | 'busy' | 'offline';
  isActive?: boolean;
}

/**
 * Create OrganizationChartNode HTML element
 */
export function createOrganizationChartNode(options: OrganizationChartNodeOptions): HTMLElement {
  const { name, position, status = 'online', isActive = false } = options;

  const colorMap = {
    online: '#1783FF',
    busy: '#00C9C9',
    offline: '#F08F56',
  };

  const color = colorMap[status];

  const wrapper = document.createElement('div');
  wrapper.className = 'org-chart-node';
  
  Object.assign(wrapper.style, {
    height: 'inherit',
    width: 'inherit',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    position: 'relative',
    border: 'none',
    backgroundColor: '#fff',
    boxSizing: 'content-box',
  });

  if (isActive) {
    wrapper.style.transform = 'translate(-3px, -3px)';
    wrapper.style.border = '2px solid #1783ff';
  }

  // Top line
  const line = document.createElement('div');
  line.className = 'org-chart-node-line';
  Object.assign(line.style, {
    width: '100%',
    height: '6px',
    backgroundColor: color,
    borderRadius: '8px 8px 0 0',
  });

  // Content
  const content = document.createElement('div');
  content.className = 'org-chart-node-content';
  Object.assign(content.style, {
    height: 'calc(100% - 6px)',
    margin: '0 16px 3px',
    display: 'flex',
    alignItems: 'center',
  });

  // Avatar
  const avatar = document.createElement('div');
  avatar.className = 'org-chart-node-content-avatar';
  Object.assign(avatar.style, {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '16px',
    backgroundColor: color,
    fontWeight: '600',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '40px',
    color: '#fff',
  });
  avatar.textContent = name.slice(0, 1);

  // Detail
  const detail = document.createElement('div');
  detail.className = 'org-chart-node-content-detail';
  detail.style.width = 'calc(100% - 56px)';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'org-chart-node-content-name';
  Object.assign(nameDiv.style, {
    color: '#242424',
    fontWeight: '600',
    fontSize: '18px',
    marginBottom: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  nameDiv.textContent = name;

  const postDiv = document.createElement('div');
  postDiv.className = 'org-chart-node-content-post';
  Object.assign(postDiv.style, {
    color: '#616161',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  postDiv.textContent = position;

  detail.appendChild(nameDiv);
  if (position) {
    detail.appendChild(postDiv);
  }

  content.appendChild(avatar);
  content.appendChild(detail);

  wrapper.appendChild(line);
  wrapper.appendChild(content);

  return wrapper;
}
