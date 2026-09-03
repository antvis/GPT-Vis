/**
 * CSS styles for the wrapper component
 */

export const wrapperStyles = `
.gpt-vis-wrapper-container {
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.gpt-vis-wrapper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  background: #f7f7f8;
  padding: 4px 8px;
  gap: 8px;
  border-bottom: 1px solid #e4e4e7;
  position: relative;
  z-index: 10;
}

.gpt-vis-wrapper-tab-left {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.gpt-vis-wrapper-tab-left::-webkit-scrollbar {
  display: none;
}

.gpt-vis-wrapper-code-navigation {
  display: contents;
}

.gpt-vis-wrapper-tab-right {
  display: flex;
  gap: 4px;
  align-items: center;
}

.gpt-vis-wrapper-theme-control {
  display: inline-flex;
  align-items: center;
  padding: 2px;
  gap: 2px;
  min-width: 0;
  border: 1px solid #d4d4d8;
  border-radius: 10px;
  background: #ececef;
}

.gpt-vis-wrapper-theme-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 28px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: #52525b;
  box-shadow: none;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 160ms ease-out, border-color 160ms ease-out,
    color 160ms ease-out, box-shadow 160ms ease-out;
}

.gpt-vis-wrapper-theme-button::after {
  content: '';
  position: absolute;
  inset: -8px 0;
}

.gpt-vis-wrapper-theme-button:hover {
  color: #18181b;
  background: rgba(255, 255, 255, 0.62);
}

.gpt-vis-wrapper-theme-button.active {
  color: #18181b;
  border-color: #d4d4d8;
  background: #fff;
  box-shadow: 0 1px 2px rgba(24, 24, 27, 0.08);
}

.gpt-vis-wrapper-theme-button:focus-visible {
  outline: 2px solid #71717a;
  outline-offset: 1px;
}

.gpt-vis-wrapper-theme-swatch {
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  border: 1px solid rgba(24, 24, 27, 0.18);
  border-radius: 50%;
  background: #6f5cf1;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.88);
}

.gpt-vis-wrapper-theme-button[data-theme='light'] .gpt-vis-wrapper-theme-swatch {
  background: #fff;
  box-shadow: inset 0 0 0 2px #f4f4f5;
}

.gpt-vis-wrapper-theme-button[data-theme='dark'] .gpt-vis-wrapper-theme-swatch {
  background: #27272a;
  box-shadow: inset 0 0 0 2px #3f3f46;
}

.gpt-vis-wrapper-theme-button[data-theme='academy'] .gpt-vis-wrapper-theme-swatch {
  border-radius: 3px;
  background: #c45b42;
  box-shadow: inset 0 0 0 2px #fbf8f4;
}

.gpt-vis-wrapper-tab-button {
  position: relative;
  border: none;
  box-shadow: none;
  background: transparent;
  color: #52525b;
  border-radius: 7px;
  min-height: 32px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 160ms ease-out, color 160ms ease-out, box-shadow 160ms ease-out;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.gpt-vis-wrapper-tab-button::after,
.gpt-vis-wrapper-text-button::after {
  content: '';
  position: absolute;
  inset: -6px 0;
}

.gpt-vis-wrapper-tab-button.active {
  background: #fff;
  color: #18181b;
  box-shadow: 0 1px 3px rgba(24, 24, 27, 0.12);
}

.gpt-vis-wrapper-tab-button:hover {
  background: #e9e9ec;
  color: #18181b;
}

.gpt-vis-wrapper-tab-button:focus-visible {
  background: #e9e9ec;
  color: #18181b;
  outline: 2px solid #71717a;
  outline-offset: 1px;
}

.gpt-vis-wrapper-text-button {
  position: relative;
  border: none;
  box-shadow: none;
  background: transparent;
  color: #52525b;
  min-height: 32px;
  padding: 0 8px;
  font-size: 12px;
  transition: background-color 160ms ease-out, color 160ms ease-out;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  font-family: inherit;
}

.gpt-vis-wrapper-text-button:hover {
  color: #18181b;
  background: #e9e9ec;
}

.gpt-vis-wrapper-text-button:focus-visible {
  color: #18181b;
  background: #e9e9ec;
  outline: 2px solid #71717a;
  outline-offset: 1px;
}

.gpt-vis-wrapper-zoom-button {
  width: 32px;
  padding: 0;
}

.gpt-vis-wrapper-divider {
  width: 1px;
  height: 16px;
  background-color: #d9d9d9;
  margin: 0 8px;
  flex-shrink: 0;
}

.gpt-vis-wrapper-content {
  overflow: hidden;
  position: relative;
  background: #fff;
}

.gpt-vis-wrapper-chart {
  min-width: 300px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
}

.gpt-vis-wrapper-chart--g6 {
  min-height: 400px;
}

.gpt-vis-wrapper-chart-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.gpt-vis-wrapper-chart--g6 .gpt-vis-wrapper-chart-container {
  min-height: 360px;
}

.gpt-vis-wrapper-chart-container::-webkit-scrollbar {
  display: none;
}

.gpt-vis-wrapper-code {
  min-height: 320px;
  max-height: 520px;
  overflow: auto;
  background: #fff;
}

.gpt-vis-wrapper-code-content {
  margin: 0;
  padding: 20px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 13px;
  line-height: 1.65;
  color: #27272a;
  font-variant-numeric: tabular-nums;
  white-space: pre-wrap;
  word-wrap: break-word;
}

@media (max-width: 520px) {
  .gpt-vis-wrapper-header {
    align-items: flex-start;
    padding: 6px;
  }

  .gpt-vis-wrapper-text-button span {
    display: none;
  }

  .gpt-vis-wrapper-text-button {
    width: 44px;
    min-height: 44px;
    padding: 0;
  }

  .gpt-vis-wrapper-theme-button {
    width: 44px;
    min-height: 44px;
    padding: 0;
  }

  .gpt-vis-wrapper-tab-button {
    min-height: 44px;
  }

  .gpt-vis-wrapper-theme-button::after,
  .gpt-vis-wrapper-tab-button::after,
  .gpt-vis-wrapper-text-button::after {
    inset: 0;
  }

  .gpt-vis-wrapper-theme-label {
    display: none;
  }

  .gpt-vis-wrapper-code-content {
    padding: 16px;
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gpt-vis-wrapper-theme-button,
  .gpt-vis-wrapper-tab-button,
  .gpt-vis-wrapper-text-button {
    transition: none;
  }
}

.gpt-vis-wrapper-tab-hide {
  display: none;
}
`;

/**
 * Inject styles into the document head
 */
export function injectWrapperStyles(): void {
  const styleId = 'gpt-vis-wrapper-styles';

  // Check if styles already exist
  if (document.getElementById(styleId)) {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = wrapperStyles;
  document.head.appendChild(styleElement);
}
