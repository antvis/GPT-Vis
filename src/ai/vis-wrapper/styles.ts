/**
 * CSS styles for the wrapper component
 */

export const wrapperStyles = `
.gpt-vis-wrapper-container {
  border-radius: 8px;
  overflow: hidden;
}

.gpt-vis-wrapper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  padding: 6px 14px 6px 6px;
  gap: 2px;
  position: relative;
  z-index: 10;
}

.gpt-vis-wrapper-tab-left {
  display: flex;
  gap: 2px;
}

.gpt-vis-wrapper-tab-right {
  display: flex;
  gap: 4px;
  align-items: center;
}

.gpt-vis-wrapper-tab-button {
  border: none;
  box-shadow: none;
  background: transparent;
  color: #494949;
  border-radius: 8px;
  height: 26px;
  width: 52px;
  font-size: 12px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: scale(1);
  cursor: pointer;
  outline: none;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gpt-vis-wrapper-tab-button.active {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.gpt-vis-wrapper-tab-button:hover,
.gpt-vis-wrapper-tab-button:focus {
  color: #494949;
  transform: scale(1.02);
}

.gpt-vis-wrapper-tab-button:not(.active):hover,
.gpt-vis-wrapper-tab-button:not(.active):focus {
  background: #f0f0f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.gpt-vis-wrapper-tab-button.active:hover,
.gpt-vis-wrapper-tab-button.active:focus {
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.gpt-vis-wrapper-tab-button:active {
  transform: scale(0.96);
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.gpt-vis-wrapper-tab-button.active:active {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.gpt-vis-wrapper-tab-button:not(.active):active {
  background: #e8e8e8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.gpt-vis-wrapper-text-button {
  border: none;
  box-shadow: none;
  background: transparent;
  color: #494949;
  height: 26px;
  padding: 0 8px;
  font-size: 12px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: scale(1);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  outline: none;
  font-family: inherit;
}

.gpt-vis-wrapper-text-button:hover,
.gpt-vis-wrapper-text-button:focus {
  color: #666;
  background: #e8e8e8;
  transform: scale(1.02);
}

.gpt-vis-wrapper-text-button:active {
  background: #e8e8e8;
  transform: scale(0.98);
}

.gpt-vis-wrapper-zoom-button {
  width: 24px;
  height: 24px;
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
  background: #fff;
  overflow: hidden;
  position: relative;
  background: #fafafa;
}

.gpt-vis-wrapper-chart {
  min-width: 300px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  padding: 16px;
}

.gpt-vis-wrapper-chart-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.gpt-vis-wrapper-chart-container::-webkit-scrollbar {
  display: none;
}

.gpt-vis-wrapper-code {
  max-height: 500px;
  overflow: auto;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #333;
  background: #fafafa;
  white-space: pre-wrap;
  word-wrap: break-word;
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
