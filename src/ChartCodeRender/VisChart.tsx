import { CopyOutlined, createFromIconfontCN, DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { memo, useRef, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';
import { lioshi } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CustomErrorBoundary } from './CustomErrorBoundary';
import { ErrorComponent } from './ErrorComponent';
import Loading from './Loading';
import type { ChartComponents, ChartJson, DataErrorRender, ErrorRender } from './type';
import {
  ChartWrapper,
  Divider,
  StyledGPTVis,
  StyledTabButton,
  TabContainer,
  TabContent,
  TabHeader,
  TabLeftGroup,
  TabRightGroup,
} from './VisChart.styles';

type RenderVisChartProps = {
  content: string;
  components: ChartComponents;
  debug?: boolean;
  loadingTimeout: number;
  style?: React.CSSProperties;
  dataErrorRender?: (errorInfo: DataErrorRender) => React.ReactElement;
  errorRender?: (errorInfo: ErrorRender) => React.ReactElement;
};

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4972893_uiu61466os.js', // 在 iconfont.cn 上生成
});

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
    const isG6 = ['mind-map', 'fishbone-diagram', 'flow-diagram', 'organization-chart'].includes(
      type,
    );

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

    // 缩放功能函数
    const handleZoomIn = () => {
      if (chartRef.current && typeof chartRef.current.zoomTo === 'function') {
        const currentZoom = chartRef.current.getZoom() || 1;
        const newZoom = Math.min(currentZoom * 1.15, 1.5);
        chartRef.current.zoomTo(newZoom);
      }
    };

    const handleZoomOut = () => {
      if (chartRef.current && typeof chartRef.current.zoomTo === 'function') {
        const currentZoom = chartRef.current.getZoom() || 1;
        const newZoom = Math.max(currentZoom / 1.15, 0.5);
        chartRef.current.zoomTo(newZoom);
      }
    };

    const handleResetZoom = () => {
      if (chartRef.current && typeof chartRef.current.zoomTo === 'function') {
        chartRef.current.zoomTo(0.5);
      }
    };

    // 复制功能
    const handleCopyCode = async () => {
      try {
        const codeText = JSON.stringify(chartJson, null, 2);
        await navigator.clipboard.writeText(codeText);
        // 可以添加成功提示
        console.log('代码已复制到剪贴板');
      } catch (err) {
        console.error('复制失败:', err);
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = JSON.stringify(chartJson, null, 2);
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          console.log('代码已复制到剪贴板');
        } catch (fallbackErr) {
          console.error('复制失败:', fallbackErr);
        }
        document.body.removeChild(textArea);
      }
    };

    async function downloadG6Image(graph: any) {
      const dataURL = await graph.toDataURL();
      const [head, content] = dataURL.split(',');
      const contentType = head.match(/:(.*?);/)![1];

      const bstr = atob(content);
      let length = bstr.length;
      const u8arr = new Uint8Array(length);

      while (length--) {
        u8arr[length] = bstr.charCodeAt(length);
      }

      const blob = new Blob([u8arr], { type: contentType });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'graph.png';
      a.click();
    }

    // 下载功能 TODO G6 不支持
    const handleDownloadChart = () => {
      console.log('图表类型:', type);
      console.log('chartRef.current:', chartRef.current);
      console.log(
        'chartRef.current 可用方法:',
        chartRef.current ? Object.getOwnPropertyNames(chartRef.current) : 'null',
      );

      if (chartRef.current && typeof chartRef.current.downloadImage === 'function') {
        chartRef.current.downloadImage('chart', 'image/png', 1);
      } else {
        console.warn('图表下载功能不可用');
        // 对于 G6 类型，尝试其他可能的下载方法
        if (chartRef.current) {
          // 检查是否有其他下载方法
          if (typeof chartRef.current.toDataURL === 'function') {
            try {
              downloadG6Image(chartRef.current);
            } catch (error) {
              console.error('下载 G6 图表图片失败:', error);
            }
          }
        }
      }
    };

    const handleDownloadCode = () => {
      const codeText = JSON.stringify(chartJson, null, 2);
      const blob = new Blob([codeText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `chart-config-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

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
            {activeTab === 'chart' ? (
              <>
                {/* 图表缩放功能 */}
                {isG6 && (
                  <>
                    <Button
                      type="text"
                      style={{ width: '24px' }}
                      onClick={handleZoomOut}
                      title="缩小"
                      icon={<IconFont type="icon-suoxiao" style={{ fontSize: 18 }} />}
                      size="small"
                    />
                    <Button
                      type="text"
                      onClick={handleZoomIn}
                      style={{ width: '24px' }}
                      title="放大"
                      icon={<IconFont type="icon-fangda" style={{ fontSize: 18 }} />}
                      size="small"
                    />
                    <Button
                      type="text"
                      onClick={handleResetZoom}
                      style={{ width: '24px' }}
                      title="重置缩放"
                      icon={<IconFont type="icon-zhongzhi-" style={{ fontSize: 16 }} />}
                      size="small"
                    />
                    <Divider />
                  </>
                )}
                <Button
                  type="text"
                  style={{ fontSize: 12, padding: '0 2px' }}
                  onClick={handleDownloadChart}
                  icon={<DownloadOutlined />}
                  size="small"
                >
                  下载
                </Button>
              </>
            ) : (
              <>
                {/* 复制代码 */}
                <Button
                  type="text"
                  style={{ fontSize: 12, padding: '0 2px', color: '#494949' }}
                  onClick={handleCopyCode}
                  icon={<CopyOutlined />}
                  size="small"
                >
                  复制
                </Button>
                {/* 下载代码 */}
                <Button
                  type="text"
                  style={{ fontSize: 12, padding: '0 2px', color: '#494949' }}
                  onClick={handleDownloadCode}
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
            <div style={{ maxHeight: '500px', overflow: 'auto' }}>
              <SyntaxHighlighter
                language="json"
                style={lioshi}
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
