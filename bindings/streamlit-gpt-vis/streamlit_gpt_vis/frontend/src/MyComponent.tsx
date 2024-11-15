import {
  ChartType,
  ConfigProvider,
  DualAxes,
  GPTVis,
  Histogram,
  Radar,
  Treemap,
  VisText,
  withDefaultChartCode,
  WordCloud,
} from '@antv/gpt-vis';
import { ConfigProvider as AntdConfigProvider, theme as AntdTheme } from 'antd';
// import { Streamlit } from 'streamlit-component-lib';
import { useRenderData } from 'streamlit-component-lib-react-hooks';

const components = {
  'vis-text': VisText,
  code: withDefaultChartCode({
    components: {
      [ChartType.DualAxes]: DualAxes,
      [ChartType.Radar]: Radar,
      [ChartType.Histogram]: Histogram,
      [ChartType.Treemap]: Treemap,
      [ChartType.WordCloud]: WordCloud,
    },
    loadingTimeout: 5,
    debug: false,
  }),
};

function MyComponent() {
  const renderData = useRenderData();
  const { args, theme } = renderData;
  const { config, content } = args;

  const style: React.CSSProperties = {};

  if (theme) {
    // Use the theme object to style our button border. Alternatively, the
    // theme style is defined in CSS vars.
    // style.font = theme.font;
  }

  const plotTheme = { type: theme?.base === 'dark' ? 'dark' : 'light' };
  const antdTheme = {
    algorithm: theme?.base === 'dark' ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm,
  };

  const plotConfig = { theme: plotTheme };

  // const onClicked = useCallback(() => {
  //   Streamlit.setComponentValue({});
  // }, []);

  return (
    <div style={style}>
      <AntdConfigProvider theme={antdTheme}>
        <ConfigProvider plot={plotConfig} {...config}>
          <GPTVis components={components}>{content}</GPTVis>
        </ConfigProvider>
      </AntdConfigProvider>
    </div>
  );
}

export default MyComponent;
