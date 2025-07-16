import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { memo, useRef, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';
import { magula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CustomErrorBoundary } from './CustomErrorBoundary';
import { ErrorComponent } from './ErrorComponent';
import Loading from './Loading';
import {
  ChartWrapper,
  StyledGPTVis,
  StyledTabButton,
  TabContainer,
  TabContent,
  TabHeader,
  TabLeftGroup,
  TabRightGroup,
} from './styles';
import type { ChartComponents, ChartJson, DataErrorRender, ErrorRender } from './type';
import { handleCopyCode, handleDownloadCode } from './utils';

type RenderVisChartProps = {
  content: string;
  components: ChartComponents;
  debug?: boolean;
  loadingTimeout: number;
  style?: React.CSSProperties;
  dataErrorRender?: (errorInfo: DataErrorRender) => React.ReactElement;
  errorRender?: (errorInfo: ErrorRender) => React.ReactElement;
};

export const RenderVisChart: React.FC<RenderVisChartProps> = memo(
  ({ style, content, components, debug, loadingTimeout, dataErrorRender, errorRender }) => {
    // 注册 JSON 语言支持
    SyntaxHighlighter.registerLanguage('json', json);

    const timeoutRef = useRef<NodeJS.Timeout>();
    const chartRef = useRef<any>(null);
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
      if (dataErrorRender) {
        return dataErrorRender({
          error: parseError,
          content,
          isParseError: true,
        });
      }

      return <ErrorComponent label="GPT-Vis withChartCode parse content error." data={content} />;
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
      if (dataErrorRender) {
        return dataErrorRender({
          content,
          chartJson,
          type,
          isUnsupportedType: true,
        });
      }

      return <ErrorComponent label={`Chart type "${type}" is not supported.`} data={content} />;
    }

    // Render the supported chart component with data
    return (
      <TabContainer style={style}>
        <TabHeader>
          <TabLeftGroup>
            <StyledTabButton active={activeTab === 'chart'}>
              <Button onClick={() => setActiveTab('chart')}>图表</Button>
            </StyledTabButton>
            <StyledTabButton active={activeTab === 'code'}>
              <Button onClick={() => setActiveTab('code')}>代码</Button>
            </StyledTabButton>
          </TabLeftGroup>

          <TabRightGroup>
            {activeTab === 'code' && (
              <>
                {/* 复制代码 */}
                <Button
                  type="text"
                  style={{ fontSize: 12, padding: '0 2px', color: '#494949' }}
                  onClick={() => handleCopyCode(chartJson)}
                  icon={<CopyOutlined />}
                  size="small"
                >
                  复制
                </Button>
                {/* 下载代码 */}
                <Button
                  type="text"
                  style={{ fontSize: 12, padding: '0 2px', color: '#494949' }}
                  onClick={() => handleDownloadCode(chartJson)}
                  icon={<DownloadOutlined />}
                  size="small"
                >
                  下载
                </Button>
              </>
            )}
          </TabRightGroup>
        </TabHeader>

        <TabContent>
          {activeTab === 'chart' ? (
            <CustomErrorBoundary
              hasRenderError={hasRenderError}
              setHasRenderError={setHasRenderError}
              setActiveTab={setActiveTab}
              debug={debug}
              errorRender={errorRender}
              content={content}
            >
              <StyledGPTVis className="gpt-vis">
                <ChartWrapper>
                  <ChartComponent
                    {...chartProps}
                    onReady={(chart: any) => {
                      chartRef.current = chart;
                    }}
                  />
                </ChartWrapper>
              </StyledGPTVis>
            </CustomErrorBoundary>
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
                  fontSize: '13px',
                  lineHeight: '1.5',
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
