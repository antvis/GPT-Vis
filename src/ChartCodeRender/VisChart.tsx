import React, { memo, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Loading from './Loading';
import type { ChartComponents, ChartJson } from './type';

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
};

export const RenderVisChart: React.FC<RenderVisChartProps> = memo(
  ({ style, content, components, debug, loadingTimeout }) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [loading, setLoading] = useState(true);
    let chartJson: ChartJson;

    try {
      chartJson = JSON.parse(content);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
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

      return <p>Chart generation timeout.</p>;
    }

    const { type, ...chartProps } = chartJson;
    const ChartComponent = components[type];

    // debug mode print chartJson
    if (debug) {
      console.log('GPT-Vis withChartCode get chartJson parse from vis-chart code block', chartJson);
    }

    // If the chart type is not supported, display an error message
    if (!ChartComponent) {
      return <p>{`Chart type "${type}" is not supported.`}</p>;
    }

    // Render the supported chart component with data
    return (
      <StyledGPTVis className="gpt-vis" style={style}>
        <GlobalStyles />
        <ChartComponent {...chartProps} />
      </StyledGPTVis>
    );
  },
);
