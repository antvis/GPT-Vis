import type { BubbleProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { Boxplot, ChartType, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个箱线图

\`\`\`vis-chart
{
  "type": "boxplot",
  "data": [{"category":"Adelie","value":181},{"category":"Adelie","value":190},{"category":"Adelie","value":195},{"category":"Adelie","value":191},{"category":"Adelie","value":198},{"category":"Adelie","value":197},{"category":"Adelie","value":194},{"category":"Adelie","value":180},{"category":"Adelie","value":185},{"category":"Adelie","value":180},{"category":"Adelie","value":183},{"category":"Adelie","value":180},{"category":"Adelie","value":178},{"category":"Adelie","value":184},{"category":"Adelie","value":196},{"category":"Adelie","value":190},{"category":"Adelie","value":184},{"category":"Adelie","value":195},{"category":"Adelie","value":196},{"category":"Adelie","value":190},{"category":"Adelie","value":182},{"category":"Adelie","value":191},{"category":"Adelie","value":188},{"category":"Adelie","value":200},{"category":"Adelie","value":191},{"category":"Adelie","value":193},{"category":"Adelie","value":194},{"category":"Adelie","value":195},{"category":"Adelie","value":192},{"category":"Adelie","value":192},{"category":"Adelie","value":188},{"category":"Adelie","value":198},{"category":"Adelie","value":190},{"category":"Adelie","value":197},{"category":"Adelie","value":195},{"category":"Adelie","value":184},{"category":"Adelie","value":195},{"category":"Adelie","value":196},{"category":"Adelie","value":193},{"category":"Adelie","value":194},{"category":"Adelie","value":190},{"category":"Adelie","value":189},{"category":"Adelie","value":205},{"category":"Adelie","value":186},{"category":"Adelie","value":208},{"category":"Adelie","value":196},{"category":"Adelie","value":192},{"category":"Adelie","value":203},{"category":"Adelie","value":190},{"category":"Adelie","value":184},{"category":"Adelie","value":190},{"category":"Adelie","value":197},{"category":"Adelie","value":191},{"category":"Adelie","value":197},{"category":"Adelie","value":196},{"category":"Adelie","value":199},{"category":"Adelie","value":189},{"category":"Adelie","value":198},{"category":"Adelie","value":202},{"category":"Adelie","value":199},{"category":"Adelie","value":195},{"category":"Adelie","value":210},{"category":"Adelie","value":197},{"category":"Adelie","value":199},{"category":"Adelie","value":190},{"category":"Adelie","value":200},{"category":"Adelie","value":193},{"category":"Adelie","value":187},{"category":"Adelie","value":190},{"category":"Adelie","value":185},{"category":"Adelie","value":190},{"category":"Adelie","value":193},{"category":"Adelie","value":201},{"category":"Chinstrap","value":196},{"category":"Chinstrap","value":193},{"category":"Chinstrap","value":197},{"category":"Chinstrap","value":197},{"category":"Chinstrap","value":198},{"category":"Chinstrap","value":194},{"category":"Chinstrap","value":201},{"category":"Chinstrap","value":201},{"category":"Chinstrap","value":197},{"category":"Chinstrap","value":195},{"category":"Chinstrap","value":191},{"category":"Chinstrap","value":193},{"category":"Chinstrap","value":197},{"category":"Chinstrap","value":200},{"category":"Chinstrap","value":205},{"category":"Chinstrap","value":201},{"category":"Chinstrap","value":203},{"category":"Chinstrap","value":195},{"category":"Chinstrap","value":210},{"category":"Chinstrap","value":205},{"category":"Chinstrap","value":210},{"category":"Chinstrap","value":196},{"category":"Chinstrap","value":201},{"category":"Chinstrap","value":212},{"category":"Chinstrap","value":187},{"category":"Chinstrap","value":201},{"category":"Chinstrap","value":203},{"category":"Chinstrap","value":197},{"category":"Chinstrap","value":203},{"category":"Chinstrap","value":202},{"category":"Chinstrap","value":206},{"category":"Chinstrap","value":207},{"category":"Chinstrap","value":193},{"category":"Chinstrap","value":210},{"category":"Gentoo","value":230},{"category":"Gentoo","value":218},{"category":"Gentoo","value":215},{"category":"Gentoo","value":219},{"category":"Gentoo","value":215},{"category":"Gentoo","value":216},{"category":"Gentoo","value":213},{"category":"Gentoo","value":217},{"category":"Gentoo","value":221},{"category":"Gentoo","value":222},{"category":"Gentoo","value":218},{"category":"Gentoo","value":215},{"category":"Gentoo","value":215},{"category":"Gentoo","value":215},{"category":"Gentoo","value":220},{"category":"Gentoo","value":222},{"category":"Gentoo","value":230},{"category":"Gentoo","value":220},{"category":"Gentoo","value":219},{"category":"Gentoo","value":208},{"category":"Gentoo","value":225},{"category":"Gentoo","value":216},{"category":"Gentoo","value":222},{"category":"Gentoo","value":225},{"category":"Gentoo","value":215},{"category":"Gentoo","value":220},{"category":"Gentoo","value":225},{"category":"Gentoo","value":220},{"category":"Gentoo","value":220},{"category":"Gentoo","value":224},{"category":"Gentoo","value":221},{"category":"Gentoo","value":231},{"category":"Gentoo","value":230},{"category":"Gentoo","value":229},{"category":"Gentoo","value":223},{"category":"Gentoo","value":221},{"category":"Gentoo","value":221},{"category":"Gentoo","value":230},{"category":"Gentoo","value":220},{"category":"Gentoo","value":223},{"category":"Gentoo","value":221},{"category":"Gentoo","value":224},{"category":"Gentoo","value":228},{"category":"Gentoo","value":218},{"category":"Gentoo","value":230},{"category":"Gentoo","value":228},{"category":"Gentoo","value":224},{"category":"Gentoo","value":226},{"category":"Gentoo","value":216},{"category":"Gentoo","value":225},{"category":"Gentoo","value":228},{"category":"Gentoo","value":228},{"category":"Gentoo","value":215},{"category":"Gentoo","value":219},{"category":"Gentoo","value":209},{"category":"Gentoo","value":229},{"category":"Gentoo","value":230},{"category":"Gentoo","value":230},{"category":"Gentoo","value":222},{"category":"Gentoo","value":222},{"category":"Gentoo","value":213}]
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
  components: { [ChartType.Boxplot]: Boxplot },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="帮我生成各类企鹅体重情况分布图"
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
