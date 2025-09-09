import type { FC } from 'react';
import type { Components, ExtraProps } from 'react-markdown';

/**
 * Text labels type for internationalization
 * 文本标签类型 - 用于国际化
 */
export type TextLabels = {
  chartTab?: string; // Chart tab text | 图表标签页文本
  codeTab?: string; // Code tab text | 代码标签页文本
  download?: string; // Download button text | 下载按钮文本
  copy?: string; // Copy button text | 复制按钮文本
  copied?: string; // Copy completed text | 复制完成文本
  renderError?: string; // Render error text | 渲染错误文本
  parseError?: string; // Parse error text | 解析错误文本
  unsupportedChart?: string; // Unsupported chart type text | 不支持的图表类型文本
};

/**
 * Chart enhancement options - contains all new feature configurations
 * 图表增强选项 - 包含所有新增的功能配置
 */
export type ChartEnhancementOptions = {
  // Tab control | 标签页控制
  /**
   * Controls whether tabs are displayed (default: true)
   * 控制是否显示标签页 (默认: true)
   */
  showTabs?: boolean;
  /**
   * Controls whether code tab is shown (default: true)
   * 控制是否显示代码标签页 (默认: true)
   */
  showCodeTab?: boolean;
  /**
   * Controls whether chart tab is shown (default: true)
   * 控制是否显示图表标签页 (默认: true)
   */
  showChartTab?: boolean;
  /**
   * Default active tab (default: 'chart')
   * 默认激活的标签页 (默认: 'chart')
   */
  defaultTab?: 'chart' | 'code';

  // Text customization | 文本自定义
  /**
   * Custom text labels
   * 自定义文本标签
   */
  textLabels?: TextLabels;
  /**
   * Locale setting for default text labels (default: 'zh-CN')
   * Supports: 'zh-CN' | 'en-US' | 'pt-BR'
   * 语言区域设置，用于默认文本标签 (默认: 'zh-CN')
   * 支持: 'zh-CN' | 'en-US' | 'pt-BR'
   */
  locale?: string;
};

/**
 * Error render function type
 * 错误渲染函数类型
 */
export type ErrorRender = {
  /** Error object | 错误对象 */
  error?: Error;
  /** Original content | 原始内容 */
  content: string;
};

/**
 * Component error render type
 * 组件错误渲染类型
 */
export type ComponentErrorRender = {
  /** Error object | 错误对象 */
  error?: Error;
  /** Original content | 原始内容 */
  content: string;
};

/**
 * Options for withChartCode HOC
 * withChartCode 高阶组件选项
 */
export type WithChartCodeOptions = {
  /**
   * Additional chart components to load
   * 要额外加载的图表组件
   */
  components: ChartComponents;
  /**
   * Custom renderers for other language code blocks
   * 自定义其它语言代码块渲染器
   */
  languageRenderers?: LanguageRenderers;
  /**
   * Default code renderer
   * 默认的代码渲染器
   */
  defaultRenderer?: CodeRenderer;
  /**
   * Enable debug logging
   * 打开调试日志
   */
  debug?: boolean;
  /**
   * Loading animation timeout, default 5s
   * 设置loading动画的超时时间，默认为 5s
   */
  loadingTimeout?: number;
  /**
   * Chart styles, configure container styles
   * 图表样式，配置容器样式
   */
  style?: React.CSSProperties;
  /**
   * Custom component error render function
   * 自定义组件错误渲染函数
   */
  componentErrorRender?: (errorInfo: ComponentErrorRender) => React.ReactElement;
  /**
   * Custom error render function
   * 自定义错误渲染函数
   */
  errorRender?: (errorInfo: ErrorRender) => React.ReactElement;
} & ChartEnhancementOptions; // Inherit all enhancement options | 继承所有增强选项

/**
 * RenderVisChart component props type
 * RenderVisChart 组件属性类型
 */
export type RenderVisChartProps = {
  /** Chart content string | 图表内容字符串 */
  content: string;
  /** Chart components dictionary | 图表组件字典 */
  components: ChartComponents;
  /** Enable debug mode | 启用调试模式 */
  debug?: boolean;
  /** Loading timeout in milliseconds | 加载超时时间（毫秒） */
  loadingTimeout: number;
  /** Container styles | 容器样式 */
  style?: React.CSSProperties;
  /** Custom component error renderer | 自定义组件错误渲染器 */
  componentErrorRender?: (errorInfo: ComponentErrorRender) => React.ReactElement;
  /** Custom error renderer | 自定义错误渲染器 */
  errorRender?: (errorInfo: ErrorRender) => React.ReactElement;
} & ChartEnhancementOptions; // Inherit all enhancement options | 继承所有增强选项

/**
 * Chart render data interface, for future extension, this is just an example
 * 图表渲染数据接口，后续拓展，这里只是写个示例
 */
export interface ChartJson {
  /** Chart type | 图表类型 */
  type: string;
  /** Chart data | 图表数据 */
  data: any;
}

/**
 * Chart components dictionary
 * 图表组件字典
 */
export interface ChartComponents {
  [key: string]: FC<any>;
}

/**
 * Code block renderer interface
 * 代码块渲染器接口
 */
export type CodeBlockComponent = Components['code'];

/**
 * Code renderer type
 * 代码渲染器类型
 */
type CodeRenderer = FC<
  React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> & ExtraProps
>;

/**
 * Custom renderers for other language code blocks
 * 自定义其它语言代码块渲染器
 */
interface LanguageRenderers {
  [key: string]: CodeRenderer;
}
