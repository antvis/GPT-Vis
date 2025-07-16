import type { FC } from 'react';
import type { Components, ExtraProps } from 'react-markdown';

/**
 * 错误渲染函数类型
 */
export type ErrorRender = {
  /** 错误对象 */
  error?: Error;
  /** 原始内容 */
  content: string;
};

export type ComponentErrorRender = {
  /** 错误对象 */
  error?: Error;
  /** 原始内容 */
  content: string;
};

export type WithChartCodeOptions = {
  /**
   * 要额外加载的图表组件
   */
  components: ChartComponents;
  /**
   * 自定义其它语言代码块渲染器
   */
  languageRenderers?: LanguageRenderers;
  /**
   * 默认的代码渲染器
   */
  defaultRenderer?: CodeRenderer;
  /**
   * 打开调试日志
   */
  debug?: boolean;
  /**
   * 设置loading动画的超时时间，默认为 5s
   */
  loadingTimeout?: number;
  /**
   * 图表样式，配置容器样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义组件错误渲染函数
   */
  componentErrorRender?: (errorInfo: ComponentErrorRender) => React.ReactElement;
  /**
   * 自定义错误渲染函数
   */
  errorRender?: (errorInfo: ErrorRender) => React.ReactElement;
};

/**
 * 图表渲染数据接口，后续拓展，这里只是写个示例
 */
export interface ChartJson {
  type: string;
  data: any;
}

/**
 * 图表组件字典
 */
export interface ChartComponents {
  [key: string]: FC<any>;
}

/**
 * 代码块渲染器接口
 */
export type CodeBlockComponent = Components['code'];

type CodeRenderer = FC<
  React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> & ExtraProps
>;

/**
 * 自定义其它语言代码块渲染器
 */
interface LanguageRenderers {
  [key: string]: CodeRenderer;
}
