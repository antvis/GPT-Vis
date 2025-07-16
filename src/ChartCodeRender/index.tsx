import { get } from 'lodash';
import React from 'react';
import { DEFAULT_CHART_COMPONENTS } from '../export';
import type { CodeBlockComponent, WithChartCodeOptions } from './type';
import { RenderVisChart } from './VisChart';

const RenderDefaultCode: CodeBlockComponent = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className = '', node, ...rest } = props;
  return (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};

const withCodeBlock = (options: WithChartCodeOptions): CodeBlockComponent => {
  // Render code block component
  return function CodeBlock(props) {
    const { children, className = '' } = props;
    const content = String(children).trim();
    const isVisChart = className.includes('language-vis-chart');
    const {
      components,
      languageRenderers,
      defaultRenderer: DefaultRenderer,
      debug,
      loadingTimeout = 5000,
      style,
      errorRender,
      componentErrorRender,
    } = options;

    // If the code block is a VisChart, render the corresponding chart component
    if (isVisChart) {
      return (
        <RenderVisChart
          style={style}
          content={content}
          components={components}
          debug={debug}
          loadingTimeout={loadingTimeout}
          errorRender={errorRender}
          componentErrorRender={componentErrorRender}
        />
      );
    }

    // If the code block math extraRenderer  languageName, the corresponding extra languageRenderers component
    const languageName = className.match(/language-(.*)/)?.[1] || '';
    const extraLanguageRenderers = languageRenderers;
    const ExtraRendererComponent = extraLanguageRenderers && extraLanguageRenderers[languageName];
    if (ExtraRendererComponent) {
      return <ExtraRendererComponent {...props} />;
    }

    // If the code block is not a VisChart, render plain code
    return DefaultRenderer ? <DefaultRenderer {...props} /> : <RenderDefaultCode {...props} />;
  };
};

// Create a higher-order component (HOC) with chart code
export const withChartCode = (options: WithChartCodeOptions): CodeBlockComponent => {
  return withCodeBlock(options);
};

/**
 * Includes built-in chart components such as line charts, pie charts, etc.
 * @param componentsArray
 * @returns
 */
export const withDefaultChartCode = (
  options?: Partial<WithChartCodeOptions>,
): CodeBlockComponent => {
  return withChartCode({
    ...options,
    components: {
      ...DEFAULT_CHART_COMPONENTS,
      ...get(options, 'components', {}),
    },
  });
};
