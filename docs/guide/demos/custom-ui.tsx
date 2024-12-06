import { ChartType, GPTVisLite, Pie, withChartCode } from '@antv/gpt-vis';
import React from 'react';
import WeatherCard from './WeatherCard';

const markdownContent = `
\`\`\`weather
{
  "locationName": "Hngzhou",
  "temperature": 11.4,
  "humidity": 82,
  "wind": 6.8,
  "cloudiness": 75,
  "uv": "0.2 of 11"
}
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "其他", "value": 5 }
  ]
}
\`\`\`
`;

const customRenderers = {
  weather: WeatherCard,
};
const components = {
  code: withChartCode({
    // register custom block renderer
    languageRenderers: customRenderers,
    // register a pie chart
    components: { [ChartType.Pie]: Pie },
  }),
};

export default () => {
  return <GPTVisLite components={components}>{markdownContent}</GPTVisLite>;
};
