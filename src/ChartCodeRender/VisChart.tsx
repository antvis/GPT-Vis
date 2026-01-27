import { snapdom } from '@zumer/snapdom';
import { debounce } from 'lodash';
import ResizeObserver from 'rc-resize-observer';
import React, { memo, useMemo, useRef, useState } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { magula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Check, Copy, DownLoad, ZoomIn, ZoomOut } from './icon';
import Loading from './Loading';
import {
  ChartWrapper,
  Divider,
  ErrorMessage,
  GlobalStyles,
  StyledGPTVis,
  StyledTabButton,
  TabContainer,
  TabContent,
  TabHeader,
  TabLeftGroup,
  TabRightGroup,
  TextButton,
} from './styles';
import type {
  ChartComponents,
  ChartJson,
  ComponentErrorRender,
  ErrorRender,
  TextLabels,
} from './type';
import { handleCopyCode } from './utils';

// Register JSON language support for syntax highlighting
SyntaxHighlighter.registerLanguage('json', json);

// Chart types that support G6 zooming functionality
const G6List = [
  'mind-map',
  'fishbone-diagram',
  'flow-diagram',
  'organization-chart',
  'network-graph',
  'indented-tree',
];

// Default text labels by locale
const DEFAULT_LABELS: Record<string, TextLabels> = {
  'zh-CN': {
    chartTab: '图表',
    codeTab: '代码',
    download: '下载',
    copy: '复制',
    copied: '完成',
    renderError: '图表渲染失败',
    parseError: 'GPT-Vis parse content error!',
    unsupportedChart: 'Chart type not supported',
    loading: '数据生成中',
  },
  'en-US': {
    chartTab: 'Chart',
    codeTab: 'Code',
    download: 'Download',
    copy: 'Copy',
    copied: 'Copied',
    renderError: 'Chart render failed',
    parseError: 'Parse content error!',
    unsupportedChart: 'Chart type not supported',
    loading: 'Generating data',
  },
  'pt-BR': {
    chartTab: 'Gráfico',
    codeTab: 'Código',
    download: 'Baixar',
    copy: 'Copiar',
    copied: 'Copiado',
    renderError: 'Erro ao renderizar gráfico',
    parseError: 'Erro ao analisar conteúdo!',
    unsupportedChart: 'Tipo de gráfico não suportado',
    loading: 'Gerando dados',
  },
};

type RenderVisChartProps = {
  content: string;
  components: ChartComponents;
  debug?: boolean;
  loadingTimeout: number;
  style?: React.CSSProperties;
  componentErrorRender?: (errorInfo: ComponentErrorRender) => React.ReactElement;
  errorRender?: (errorInfo: ErrorRender) => React.ReactElement;

  // New props for tab control
  showTabs?: boolean; // Controls whether tabs are displayed (default: true)
  showCodeTab?: boolean; // Controls whether code tab is shown (default: true)
  showChartTab?: boolean; // Controls whether chart tab is shown (default: true)
  defaultTab?: 'chart' | 'code'; // Default active tab (default: 'chart')

  // New props for text customization
  textLabels?: TextLabels; // Custom text labels
  locale?: string; // Locale for default text labels (default: 'zh-CN')
};

export const RenderVisChart: React.FC<RenderVisChartProps> = memo(
  ({
    style,
    content,
    components,
    debug = false,
    loadingTimeout,
    componentErrorRender,
    errorRender,
    showTabs = true,
    showCodeTab = true,
    showChartTab = true,
    defaultTab = 'chart',
    textLabels = {},
    locale = 'zh-CN',
  }) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const copyTimeoutRef = useRef<NodeJS.Timeout>();
    const [loading, setLoading] = useState(true);
    const [hasRenderError, setHasRenderError] = useState(false);
    const [copied, setCopied] = useState(false);
    const chartRef = useRef<any>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // Merge default labels with custom labels
    const labels: TextLabels = {
      ...(DEFAULT_LABELS[locale] || DEFAULT_LABELS['en-US']),
      ...textLabels,
    };

    // Determine valid default tab based on visibility settings
    const getValidDefaultTab = (): 'chart' | 'code' => {
      if (defaultTab === 'chart' && showChartTab) return 'chart';
      if (defaultTab === 'code' && showCodeTab) return 'code';
      if (showChartTab) return 'chart';
      if (showCodeTab) return 'code';
      return 'chart';
    };

    const [activeTab, setActiveTab] = useState<'chart' | 'code'>(getValidDefaultTab());

    // Parse chart JSON early to determine type for hooks
    let chartJson: ChartJson | null = null;
    let parseError: Error | null = null;
    let type: string | undefined;

    try {
      chartJson = JSON.parse(content);
      type = chartJson?.type;
    } catch (e) {
      parseError = e as Error;
    }

    // Check if chart supports G6 zoom functionality
    // This must be called unconditionally before any early returns
    const isG6 = type ? G6List.includes(type) : false;

    // Handle chart resizing on container size change
    // This useMemo must be called unconditionally to maintain hook order
    const handleResize = useMemo(() => {
      const debouncedFn = debounce(() => {
        const chart = chartRef.current;
        const container = chartContainerRef.current;

        // 增加 null 检查和类型守卫
        if (!chart || !container || !(container instanceof HTMLElement)) {
          return;
        }

        try {
          if (isG6) {
            // https://github.com/antvis/G6/blob/91c0ac85e4e636a05bd1a3c5e56a4928d1242a9b/packages/g6/src/runtime/graph.ts#L1334
            chart.resize?.();
            chart.autoFit?.();
          } else {
            // https://github.com/antvis/G2/blob/c5b1887408f951f59f8263e7e1a306dbdae50660/src/api/runtime.ts#L236
            chart.changeSize?.();
          }
        } catch (error) {
          console.error('Failed to resize chart:', error);
        }
      }, 150);

      debouncedFn.cancel?.();

      return debouncedFn;
    }, [isG6]);

    // Handle parse errors after all hooks are called
    if (parseError) {
      // Clear any existing timeout and set loading timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        if (debug) {
          console.warn('GPT-Vis parse content timeout!');
        }
      }

      timeoutRef.current = setTimeout(() => {
        setLoading(false);
      }, loadingTimeout);

      // Show loading state while timeout is active
      if (loading) {
        return (
          <StyledGPTVis className="gpt-vis" style={style}>
            <Loading text={labels.loading || ''} />
          </StyledGPTVis>
        );
      }

      // Use custom error render function if provided
      if (errorRender) {
        return errorRender({
          error: parseError,
          content,
        });
      }

      // Return default error message
      return <div>{labels.parseError}</div>;
    }

    // chartJson is guaranteed to be non-null here
    const { type: chartType, ...chartProps } = chartJson!;
    const ChartComponent = components[chartType];

    // Debug mode: print chart JSON
    if (debug) {
      console.log('GPT-Vis withChartCode get chartJson parse from vis-chart code block', chartJson);
    }

    // Handle unsupported chart types
    if (!ChartComponent) {
      const message = `${labels.unsupportedChart}: "${chartType}"`;

      if (errorRender) {
        return errorRender({
          error: new Error(message),
          content,
        });
      }

      return <div>{message}</div>;
    }

    // Error fallback component for chart rendering errors
    const FallbackComponent = ({ error }: FallbackProps) => {
      // Set render error state and switch to code tab
      if (!hasRenderError) {
        setHasRenderError(true);
        if (showCodeTab && showTabs) {
          setActiveTab('code');
        }
      }

      if (componentErrorRender) {
        return componentErrorRender({
          error: error as Error,
          content,
        });
      }

      // Return simple error message
      return (
        <div>
          <ErrorMessage>{labels.renderError}</ErrorMessage>
        </div>
      );
    };

    // Handle copy functionality
    const handleCopy = async () => {
      try {
        await handleCopyCode(chartJson!);
        setCopied(true);

        // Clear previous timeout
        if (copyTimeoutRef.current) {
          clearTimeout(copyTimeoutRef.current);
        }

        // Reset state after 1 second
        copyTimeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, 1000);
      } catch (error) {
        console.error('Copy failed:', error);
      }
    };

    // Handle download functionality
    const handleDownload = async () => {
      try {
        if (chartContainerRef.current) {
          const result = await snapdom(chartContainerRef.current, { scale: 2 });
          await result.download({
            format: 'png',
            filename: `chart-${chartType}-${Date.now()}`,
          });
        }
      } catch (error) {
        console.error('Download image failed:', error);
      }
    };

    // Zoom out functionality
    const handleZoomOut = () => {
      if (chartRef.current && typeof chartRef.current.zoomTo === 'function') {
        const currentZoom = chartRef.current.getZoom() || 1;
        const newZoom = Math.min(currentZoom * 1.15, 1.5);
        chartRef.current.zoomTo(newZoom);
      }
    };

    // Zoom in functionality
    const handleZoomIn = () => {
      if (chartRef.current && typeof chartRef.current.zoomTo === 'function') {
        const currentZoom = chartRef.current.getZoom() || 1;
        const newZoom = Math.max(currentZoom / 1.15, 0.1);
        chartRef.current.zoomTo(newZoom);
      }
    };

    // Render without tabs if showTabs is false
    if (!showTabs) {
      return (
        <StyledGPTVis className="gpt-vis" style={style}>
          <GlobalStyles />
          <ResizeObserver onResize={handleResize}>
            <ChartWrapper ref={chartContainerRef}>
              <ErrorBoundary
                FallbackComponent={FallbackComponent}
                onError={(error: unknown, errorInfo: React.ErrorInfo) => {
                  console.error('GPT-Vis Render error:', error);
                  if (debug) {
                    console.error('GPT-Vis Render error info:', errorInfo);
                  }
                }}
              >
                <ChartComponent
                  {...chartProps}
                  onReady={(chart: any) => {
                    chartRef.current = chart;
                  }}
                />
              </ErrorBoundary>
            </ChartWrapper>
          </ResizeObserver>
        </StyledGPTVis>
      );
    }

    // Render with tabs
    return (
      <TabContainer style={style}>
        <TabHeader>
          <TabLeftGroup>
            {showChartTab && (
              <StyledTabButton active={activeTab === 'chart'} onClick={() => setActiveTab('chart')}>
                {labels.chartTab}
              </StyledTabButton>
            )}
            {showCodeTab && (
              <StyledTabButton active={activeTab === 'code'} onClick={() => setActiveTab('code')}>
                {labels.codeTab}
              </StyledTabButton>
            )}
          </TabLeftGroup>

          <TabRightGroup>
            {activeTab === 'chart' ? (
              <>
                {isG6 && (
                  <>
                    <TextButton
                      onClick={handleZoomIn}
                      style={{ width: '24px', height: '24px', padding: 0 }}
                    >
                      <ZoomIn size={18} />
                    </TextButton>
                    <TextButton
                      onClick={handleZoomOut}
                      style={{ width: '24px', height: '24px', padding: 0 }}
                    >
                      <ZoomOut size={18} />
                    </TextButton>
                    <Divider />
                  </>
                )}
                <TextButton onClick={handleDownload}>
                  <DownLoad size={16} />
                  {labels.download}
                </TextButton>
              </>
            ) : (
              <>
                {/* Copy code button */}
                <TextButton onClick={handleCopy}>
                  {copied ? <Check /> : <Copy />}
                  {copied ? labels.copied : labels.copy}
                </TextButton>
              </>
            )}
          </TabRightGroup>
        </TabHeader>

        <TabContent>
          {activeTab === 'chart' ? (
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={(error: unknown, errorInfo: React.ErrorInfo) => {
                console.error('GPT-Vis Render error:', error);
                if (!hasRenderError) {
                  setHasRenderError(true);
                  if (showCodeTab) {
                    setActiveTab('code');
                  }
                }
                if (debug) {
                  console.error('GPT-Vis Render error info:', errorInfo);
                }
              }}
            >
              <StyledGPTVis className="gpt-vis" type={chartType}>
                <GlobalStyles />
                <ResizeObserver onResize={handleResize}>
                  <ChartWrapper ref={chartContainerRef}>
                    <ChartComponent
                      {...chartProps}
                      onReady={(chart: any) => {
                        chartRef.current = chart;
                      }}
                    />
                  </ChartWrapper>
                </ResizeObserver>
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
