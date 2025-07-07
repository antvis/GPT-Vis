import React, { memo, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled, { createGlobalStyle } from 'styled-components';
import { ErrorComponent } from './ErrorComponent';
import Loading from './Loading';
import type { ChartComponents, ChartJson, ErrorRender } from './type';

const StyledGPTVis = styled.div`
  min-width: 300px;
  height: 300px;
  max-width: 100%;
`;
const GlobalStyles = createGlobalStyle`
  pre:has(.gpt-vis) {
    overflow: hidden;
  }
`;

type RenderVisChartProps = {
  content: string;
  components: ChartComponents;
  debug?: boolean;
  loadingTimeout: number;
  style?: React.CSSProperties;
  errorRender?: ErrorRender;
};

export const RenderVisChart: React.FC<RenderVisChartProps> = memo(
  ({ style, content, components, debug, loadingTimeout, errorRender }) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [loading, setLoading] = useState(true);
    let chartJson: ChartJson;
    let parseError: Error | undefined;

    try {
      chartJson = JSON.parse(content);
    } catch (e) {
      parseError = e as Error;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        if (debug) {
          console.warn('GPT-Vis withChartCode parse content timeout');
        }
      }
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
      }, loadingTimeout);

      if (loading) {
        return (
          <StyledGPTVis className="gpt-vis" style={style}>
            <Loading />
          </StyledGPTVis>
        );
      }

      // 使用自定义错误渲染函数
      if (errorRender) {
        return errorRender({
          error: parseError,
          content,
          isParseError: true,
        });
      }

      return (
        <>
          <ErrorComponent label="GPT-Vis withChartCode parse content error." data={content} />
        </>
      );
    }

    const { type, ...chartProps } = chartJson;
    const ChartComponent = components[type];

    // debug mode print chartJson
    if (debug) {
      console.log('GPT-Vis withChartCode get chartJson parse from vis-chart code block', chartJson);
    }

    // If the chart type is not supported, display an error message
    if (!ChartComponent) {
      // 使用自定义错误渲染函数
      if (errorRender) {
        return errorRender({
          content,
          chartJson,
          type,
          isUnsupportedType: true,
        });
      }

      return <ErrorComponent label={`Chart type "${type}" is not supported.`} data={content} />;
    }

    // 自定义错误边界组件
    const CustomErrorBoundary = ({ children }: { children: React.ReactNode }) => {
      return (
        <ErrorBoundary
          fallbackRender={({ error }) => {
            // 使用自定义错误渲染函数
            if (errorRender) {
              return errorRender({
                error,
                content,
                chartJson,
                type,
                isRenderError: true,
              });
            }

            // 默认错误处理
            return <ErrorComponent data={content} />;
          }}
          onError={(error, errorInfo) => {
            console.error('GPT-Vis Render error:', error);
            if (debug) {
              console.error('GPT-Vis Render error info:', errorInfo);
            }
          }}
        >
          {children}
        </ErrorBoundary>
      );
    };

    // Render the supported chart component with data
    return (
      <CustomErrorBoundary>
        <StyledGPTVis className="gpt-vis" style={style}>
          <GlobalStyles />
          <ChartComponent {...chartProps} />
        </StyledGPTVis>
      </CustomErrorBoundary>
    );
  },
);
