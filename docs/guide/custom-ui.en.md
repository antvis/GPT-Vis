---
title: Custom Model Output UI
nav: { title: 'Guide', order: 0 }
toc: content
order: 1
---

## Custom Model Output UI

Customize the UI for the structured data output by the model through code blocks.

```tsx | pure
import { GPTVisLite, withChartCode } from '@antv/gpt-vis';

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
  weather: (props) => 'WeatherCard',
};
const components = {
  code: withChartCode({
    // register custom block renderer
    languageRenderers: customRenderers,
  }),
};

export default () => {
  return <GPTVisLite components={components}>{markdownContent}</GPTVisLite>;
};
```

<code src="./demos/custom-ui.tsx"></code>
