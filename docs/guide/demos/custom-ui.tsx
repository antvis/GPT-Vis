import { Bubble } from '@ant-design/x';
import { GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';
import WeatherCard from './WeatherCard';

const markdownContent = `
\`\`\`weather
{
  "locationName": "Hangzhou",
  "temperature": 11.4,
  "humidity": 82,
  "wind": 6.8,
  "cloudiness": 75,
  "uv": "0.2 of 11"
}
\`\`\`

In Hangzhou, the current weather is as follows:
- The temperature is 11.4°C, humidity is 82%, and wind speed is 6.8 kph.
- There's 75% cloud cover, and the UV index is very low at 0.2 out of 11.
- This indicates cool, humid conditions with overcast skies and minimal UV exposure.
`;

const customRenderers = {
  weather: WeatherCard,
};
const components = {
  code: withChartCode({
    // register custom block renderer
    languageRenderers: customRenderers,
  }),
};

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  padding: 20,
  borderRadius: 8,
};

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble placement="end" content="How is the weather today?" />
      <Bubble content={<GPTVisLite components={components}>{markdownContent}</GPTVisLite>} />
    </div>
  );
};
