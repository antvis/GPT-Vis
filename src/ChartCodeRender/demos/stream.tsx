import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, Column, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React, { useEffect, useRef, useState } from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个柱状图

\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "第一产业", "value": 7200.0 },
    { "category": "第二产业", "value": 36600.0 },
    { "category": "第三产业" ,"value": 41000.0 }
  ]
}
\`\`\`
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

// 自定义代码块渲染组件，NOTE: withChartCode 不要直接放入函数内部，避免重复渲染抖动问题！！！
const CodeComponent = withChartCode({
  components: { [ChartType.Column]: Column },
  loadingTimeout: 3000,
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

const useStreamText = () => {
  const [text, setText] = useState('');
  const nowTextRef = useRef('');
  const timerRef = useRef<any>(null);

  /** 模拟流式输出markdownContent */
  const streamOutput = () => {
    timerRef.current = setInterval(() => {
      const step = parseInt((Math.random() * 10).toString(), 20);
      const nowText =
        nowTextRef.current +
        markdownContent.substring(nowTextRef.current.length, nowTextRef.current.length + step);
      nowTextRef.current = nowText;
      setText(nowText);
      if (text.length === markdownContent.length - 1) {
        clearTimeout(timerRef.current);
      }
    }, 200);
  };

  const restart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    nowTextRef.current = '';
    setText('');
    streamOutput();
  };

  return [text, restart] as const;
};

export default () => {
  const [text, restart] = useStreamText();

  useEffect(() => {
    restart();
  }, []);

  return (
    <div style={bgStyle}>
      <button onClick={restart} type="button">
        重新演示
      </button>

      <Bubble
        placement="end"
        content="帮我可视化一下我的数据"
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp',
        }}
        styles={{ content: { background: '#ebebeb' } }}
      />
      <Bubble
        content={text}
        messageRender={RenderMarkdown}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
        }}
        variant="shadow"
        styles={{ content: { background: '#fff' } }}
      />
      <Bubble
        content={'生成超时的演示\n' + text.substring(0, text.length - 10)}
        messageRender={RenderMarkdown}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
        }}
        variant="shadow"
        styles={{ content: { background: '#fff' } }}
      />
    </div>
  );
};
