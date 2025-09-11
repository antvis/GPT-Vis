import type { BubbleProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { ChartType, GPTVisLite, Sankey, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个桑基图，展示了不同能源流向的分布情况：

\`\`\`vis-chart

{
    "type": "sankey",
    "theme": "academy",
    "data": [
    {
        "source": "Agricultural 'waste'",
        "target": "Bio-conversion",
        "value": 124.729
    },
    {
        "source": "Bio-conversion",
        "target": "Liquid",
        "value": 0.597
    },
    {
        "source": "Bio-conversion",
        "target": "Losses",
        "value": 26.862
    },
    {
        "source": "Bio-conversion",
        "target": "Solid",
        "value": 280.322
    },
    {
        "source": "Bio-conversion",
        "target": "Gas",
        "value": 81.144
    },
    {
        "source": "Biofuel imports",
        "target": "Liquid",
        "value": 35
    },
    {
        "source": "Biomass imports",
        "target": "Solid",
        "value": 35
    },
    {
        "source": "Coal imports",
        "target": "Coal",
        "value": 11.606
    },
    {
        "source": "Coal reserves",
        "target": "Coal",
        "value": 63.965
    },
    {
        "source": "Coal",
        "target": "Solid",
        "value": 75.571
    },
    {
        "source": "District heating",
        "target": "Industry",
        "value": 10.639
    },
    {
        "source": "District heating",
        "target": "Heating and cooling - commercial",
        "value": 22.505
    },
    {
        "source": "District heating",
        "target": "Heating and cooling - homes",
        "value": 46.184
    },
    {
        "source": "Electricity grid",
        "target": "Over generation / exports",
        "value": 104.453
    },
    {
        "source": "Electricity grid",
        "target": "Heating and cooling - homes",
        "value": 113.726
    },
    {
        "source": "Electricity grid",
        "target": "H2 conversion",
        "value": 27.14
    },
    {
        "source": "Electricity grid",
        "target": "Industry",
        "value": 342.165
    },
    {
        "source": "Electricity grid",
        "target": "Road transport",
        "value": 37.797
    },
    {
        "source": "Electricity grid",
        "target": "Agriculture",
        "value": 4.412
    },
    {
        "source": "Electricity grid",
        "target": "Heating and cooling - commercial",
        "value": 40.858
    }
]
  }
\`\`\`
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  padding: 20,
  background: '#f7f7f7',
  borderRadius: 8,
  overflow: 'auto',
};

const CodeComponent = withChartCode({
  components: { [ChartType.Sankey]: Sankey },
  style: { width: 600 },
});
const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="生成桑基图"
      avatar={{
        src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp',
      }}
      styles={{ content: { background: '#ebebeb' } }}
    />
    <Bubble
      content={markdownContent}
      messageRender={RenderMarkdown}
      avatar={{
        src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
      }}
      variant="shadow"
      styles={{ content: { background: '#fff' } }}
    />
  </div>
);
