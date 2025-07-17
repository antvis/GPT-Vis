import styled, { createGlobalStyle } from 'styled-components';

export const StyledGPTVis = styled.div`
  min-width: 300px;
  height: 300px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  padding: 16px;
`;

export const CopyButton = styled.button`
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

  &:hover,
  &:focus {
    color: #666;
    background: #f5f5f5;
    transform: scale(1.02);
  }

  &:active {
    background: #e8e8e8;
    transform: scale(0.98);
  }

  .anticon {
    font-size: 12px;
  }

  /* 禁用状态 */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover,
    &:focus,
    &:active {
      background: transparent;
      transform: scale(1);
    }
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;

  & > * {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const TabContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  padding: 6px 14px 6px 6px;
  gap: 2px;
  position: relative;
  z-index: 10;
`;

export const TabLeftGroup = styled.div`
  display: flex;
  gap: 2px;
`;

export const TabRightGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const TabContent = styled.div`
  background: #fff;
  overflow: hidden;
  position: relative;
  background: #fafafa;
`;

export const ErrorMessage = styled.div`
  height: 150px;
  font-size: 12px;
  color: #666;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GlobalStyles = createGlobalStyle`
  pre:has(.gpt-vis) {
    overflow: hidden;
  }
`;

export const StyledTabButton = styled.button<{ active?: boolean }>`
  border: none;
  box-shadow: none;
  background: ${(props) => (props.active ? '#fff' : 'transparent')};
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

  /* 选中状态的阴影效果 */
  ${(props) =>
    props.active &&
    `
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  `}

  &:hover,
  &:focus {
    background: ${(props) => (props.active ? '#fff' : '#f0f0f0')};
    color: #494949;
    box-shadow: ${(props) =>
      props.active ? '0 2px 6px rgba(0, 0, 0, 0.12)' : '0 1px 3px rgba(0, 0, 0, 0.06)'};
    transform: scale(1.02);
  }

  &:active {
    background: ${(props) => (props.active ? '#fff' : '#e8e8e8')};
    transform: scale(0.96);
    box-shadow: ${(props) =>
      props.active ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.04)'};
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;
