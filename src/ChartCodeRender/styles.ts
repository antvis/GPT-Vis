import { Button } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

export const StyledGPTVis = styled.div`
  min-width: 300px;
  height: 300px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  padding: 16px;
`;

export const CopyButton = styled(Button)`
  &.ant-btn {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
    color: #666 !important;
    height: 28px !important;
    padding: 0 8px !important;
    font-size: 12px !important;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    transform: scale(1) !important;
    border-radius: 8px !important;

    &:hover,
    &:focus {
      border: none !important;
      color: #666 !important;
      background: #f5f5f5 !important;
      box-shadow: none !important;
      transform: scale(1.02) !important;
    }

    &:active {
      background: #e8e8e8 !important;
      transform: scale(0.98) !important;
      box-shadow: none !important;
    }

    .anticon {
      font-size: 12px;
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

export const ToolButton = styled(Button)`
  &.ant-btn {
    color: #666 !important;
    height: 28px !important;
    padding: 0 8px !important;
    font-size: 12px !important;

    &:hover,
    &:focus {
      border-color: #40a9ff !important;
      color: #40a9ff !important;
      background: #f6ffed !important;
    }

    &:active {
      background: #e6f7ff !important;
    }

    .anticon {
      font-size: 12px;
    }
  }
`;

export const ZoomButton = styled(Button)`
  &.ant-btn {
    border: 1px solid #d9d9d9 !important;
    background: #fff !important;
    color: #666 !important;
    height: 28px !important;
    width: 28px !important;
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    &:focus {
      border-color: #40a9ff !important;
      color: #40a9ff !important;
      background: #f6ffed !important;
    }

    &:active {
      background: #e6f7ff !important;
    }

    &:disabled,
    &[disabled] {
      border-color: #d9d9d9 !important;
      background: #f5f5f5 !important;
      color: #bfbfbf !important;
      cursor: not-allowed !important;

      &:hover,
      &:focus {
        border-color: #d9d9d9 !important;
        background: #f5f5f5 !important;
        color: #bfbfbf !important;
      }
    }

    .anticon {
      font-size: 14px;
    }
  }
`;

export const TabContent = styled.div`
  background: #fff;
  overflow: hidden;
  position: relative;
  background: #fafafa;
`;

export const CodeContainer = styled.div`
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: auto;
  max-height: 400px;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 4px;

    &:hover {
      background: #bfbfbf;
    }
  }

  .hljs {
    background: transparent !important;
  }

  .hljs-attr {
    color: #1890ff !important;
    font-weight: 500;
  }

  .hljs-string {
    color: #52c41a !important;
  }

  .hljs-number {
    color: #fa8c16 !important;
  }

  .hljs-literal {
    color: #722ed1 !important;
    font-weight: 500;
  }

  .hljs-keyword {
    color: #722ed1 !important;
    font-weight: 500;
  }

  .hljs-punctuation {
    color: #595959 !important;
  }
`;

export const CodeContent = styled.div`
  padding: 16px;
  font-family: inherit;
  line-height: 1.5;

  .code-line {
    display: block;
    position: relative;
    min-height: 1.5em;

    &:hover {
      background: rgba(22, 119, 255, 0.04);
      border-radius: 2px;
    }
  }
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

export const StyledTabButton = styled.div<{ active?: boolean }>`
  .ant-btn {
    border: none !important;
    box-shadow: none !important;
    background: ${(props) => (props.active ? '#fff' : 'transparent')} !important;
    color: #494949 !important;
    border-radius: 8px !important;
    height: 26px !important;
    width: 52px !important;
    font-size: 12px !important;

    &:hover,
    &:focus {
      background: transparent;
      color: #494949 !important;
      border: none !important;
      box-shadow: none !important;
    }

    &:active {
      background: transparent !important;
      transform: none !important;
      box-shadow: none !important;
    }
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 14px;
  background-color: #bbb;
  margin: 0 4px;
`;
