import { CopyOutlined } from '@ant-design/icons';
import React, { memo, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { magula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Loading from './Loading';
import {
  ChartWrapper,
  CopyButton,
  ErrorMessage,
  GlobalStyles,
  StyledGPTVis,
  StyledTabButton,
  TabContainer,
  TabContent,
  TabHeader,
  TabLeftGroup,
  TabRightGroup,
} from './styles';
import type { ChartComponents, ChartJson, ComponentErrorRender, ErrorRender } from './type';
import { handleCopyCode } from './utils';

// 注册 JSON 语言支持
SyntaxHighlighter.registerLanguage('json', json);

type RenderVisChartProps = {
  content: string;
  components: ChartComponents;
  debug?: boolean;
  loadingTimeout: number;
  style?: React.CSSProperties;
  componentErrorRender?: (errorInfo: ComponentErrorRender) => React.ReactElement;
  errorRender?: (errorInfo: ErrorRender) => React.ReactElement;
};

export const RenderVisChart: React.FC<RenderVisChartProps> = memo(
  ({ style, content, components, debug, loadingTimeout, componentErrorRender, errorRender }) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'chart' | 'code'>('chart');
    const [hasRenderError, setHasRenderError] = useState(false);
    let chartJson: ChartJson;

    try {
      chartJson = JSON.parse(content);
    } catch (e) {
      const parseError = e as Error;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        if (debug) {
          console.warn('GPT-Vis parse content timeout!');
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
        });
      }

      return <div> GPT-Vis parse content error! </div>;
    }

    const { type, ...chartProps } = chartJson;
    const ChartComponent = components[type];

    // debug mode print chartJson
    if (debug) {
      console.log('GPT-Vis withChartCode get chartJson parse from vis-chart code block', chartJson);
    }

    // If the chart type is not supported, display an error message
    if (!ChartComponent) {
      const message = `Chart type "${type}" is not supported.`;
      if (errorRender) {
        return errorRender({
          error: new Error(message),
          content,
        });
      }

      return <div> {message} </div>;
    }

    const FallbackComponent = (fallbackProps: { error: Error }) => {
      const { error } = fallbackProps;

      // 设置渲染错误状态并切换到代码 tab
      if (!hasRenderError) {
        setHasRenderError(true);
        setActiveTab('code');
      }

      if (componentErrorRender) {
        return componentErrorRender({
          error,
          content,
        });
      }

      // 返回一个简单的错误提示
      return (
        <div>
          <ErrorMessage>图表渲染失败</ErrorMessage>
        </div>
      );
    };

    // Render the supported chart component with data
    return (
      <TabContainer style={style}>
        <TabHeader>
          <TabLeftGroup>
            <StyledTabButton active={activeTab === 'chart'} onClick={() => setActiveTab('chart')}>
              图表
            </StyledTabButton>
            <StyledTabButton active={activeTab === 'code'} onClick={() => setActiveTab('code')}>
              代码
            </StyledTabButton>
          </TabLeftGroup>

          <TabRightGroup>
            {activeTab === 'code' && (
              <>
                {/* 复制代码 */}
                <CopyButton onClick={() => handleCopyCode(chartJson)}>
                  <CopyOutlined />
                  复制
                </CopyButton>
              </>
            )}
          </TabRightGroup>
        </TabHeader>

        <TabContent>
          {activeTab === 'chart' ? (
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
              <StyledGPTVis className="gpt-vis">
                <GlobalStyles />
                <ChartWrapper>
                  <ChartComponent {...chartProps} />
                </ChartWrapper>
              </StyledGPTVis>
            </ErrorBoundary>
          ) : (
            <div style={{ maxHeight: 500, overflow: 'auto' }}>
              <SyntaxHighlighter
                language="json"
                style={magula}
                showLineNumbers={false}
                wrapLines={true}
                customStyle={{
                  background: 'transparent',
                  padding: '16px',
                  margin: 0,
                  fontSize: '12px',
                  lineHeight: '1',
                }}
              >
                {JSON.stringify(chartJson, null, 2) || content}
              </SyntaxHighlighter>
            </div>
          )}
        </TabContent>
      </TabContainer>
    );
  },
);
