import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from './VisChart.styles';

interface ErrorRenderProps {
  error: Error;
  content: string;
  isRenderError: boolean;
}

interface CustomErrorBoundaryProps {
  children: React.ReactNode;
  hasRenderError: boolean;
  setHasRenderError: (hasError: boolean) => void;
  setActiveTab: (tab: 'chart' | 'code') => void;
  debug?: boolean;
  errorRender?: (props: ErrorRenderProps) => React.ReactElement;
  content: string;
}

export const CustomErrorBoundary: React.FC<CustomErrorBoundaryProps> = (props) => {
  const {
    children,
    hasRenderError,
    setHasRenderError,
    setActiveTab,
    debug = false,
    errorRender,
    content,
  } = props;

  const FallbackComponent = (fallbackProps: { error: Error }) => {
    const { error } = fallbackProps;

    // 设置渲染错误状态并切换到代码 tab
    if (!hasRenderError) {
      setHasRenderError(true);
      setActiveTab('code');
    }

    if (errorRender) {
      return errorRender({
        error,
        content,
        isRenderError: true,
      });
    }

    // 返回一个简单的错误提示
    return (
      <div>
        <ErrorMessage>图表渲染失败</ErrorMessage>
      </div>
    );
  };

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error: Error, errorInfo: React.ErrorInfo) => {
        console.error('GPT-Vis Render error:', error);
        if (!hasRenderError) {
          setHasRenderError(true);
          setActiveTab('code');
        }
        if (debug) {
          console.error('GPT-Vis Render error info:', errorInfo);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
