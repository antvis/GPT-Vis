/**
 * Shared navigation component for playground pages
 */
export function createNavigation(activePage: string): string {
  const pages = [
    { id: 'home', label: '🏠 Home', href: './pages.html' },
    { id: 'charts', label: '📊 Chart Gallery', href: './charts.html' },
    { id: 'gptvis-api', label: '⚡ GPTVis API', href: './gptvis-api.html' },
    { id: 'wrapper', label: '🎁 Wrapper Demo', href: './wrapper-demo.html' },
  ];

  const navItems = pages
    .map(
      (page) => `
    <a href="${page.href}" class="nav-item ${page.id === activePage ? 'active' : ''}">
      ${page.label}
    </a>
  `,
    )
    .join('');

  return `
    <nav class="playground-nav">
      ${navItems}
    </nav>
  `;
}

export const navStyles = `
  .playground-nav {
    background: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .nav-item {
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .nav-item:hover {
    background: #f5f5f5;
    color: #333;
  }

  .nav-item.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }
`;

/**
 * Insert navigation into page
 */
export function injectNavigation(activePage: string): void {
  const nav = createNavigation(activePage);
  const style = document.createElement('style');
  style.textContent = navStyles;
  document.head.appendChild(style);

  const firstContainer = document.querySelector('.container, body > div');
  if (firstContainer) {
    firstContainer.insertAdjacentHTML('beforebegin', nav);
  }
}
