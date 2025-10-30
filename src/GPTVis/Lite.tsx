import XMarkdown from '@ant-design/x-markdown';
import EventEmitter from '@antv/event-emitter';
import { Button, Skeleton } from 'antd';
import React, { memo, useEffect, useMemo, useState } from 'react';
import type { Options } from 'react-markdown';
import { GPTVisContext } from './hooks/useContext';
import { useEventPublish } from './hooks/useEvent';

// 自定义加载组件
const LoadingComponents = {
  'loading-link': () => (
    <Skeleton.Button active size="small" style={{ margin: '4px 0', width: 16, height: 16 }} />
  ),
  'loading-image': () => <Skeleton.Image active style={{ width: 60, height: 60 }} />,
};

export interface GPTVisLiteProps extends Options {
  /**
   * 自定义 markdown components
   */
  components?:
    | Options['components']
    | {
        [key: string]: (props: any) => React.ReactNode;
      };
  /**
   * 🧪 订阅组件事件，实验性属性
   * 用于子组件与容器组件通信
   */
  eventSubs?: Record<string, (data?: any) => void>;
}

const GPTVisLite: React.FC<GPTVisLiteProps> = ({
  children,
  components,
  // rehypePlugins,
  // remarkPlugins,
  eventSubs,
  ...rest
}) => {
  const eventBus = useMemo(() => new EventEmitter(), []);
  const contextValue = useMemo(() => ({ eventBus }), [eventBus]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [index, setIndex] = useState(0);
  const timer = React.useRef<any>(-1);

  useEffect(() => {
    if (eventSubs) {
      const events = Object.keys(eventSubs);
      for (const eventName of events) {
        eventBus.on(eventName, eventSubs[eventName]);
      }
      return () => {
        for (const eventName of events) {
          eventBus.off(eventName, eventSubs[eventName]);
        }
      };
    }
  }, [eventBus, eventSubs]);

  const renderStream = () => {
    if (index >= children?.length) {
      clearTimeout(timer.current);
      setIsStreaming(false);
      return;
    }
    timer.current = setTimeout(() => {
      setIndex((prev) => prev + 1);
      renderStream();
    }, 50);
  };

  useEffect(() => {
    if (index === children?.length) return;
    console.log('index changed:', index, children?.length);
    renderStream();
    setIsStreaming(true);
    return () => {
      clearTimeout(timer.current);
    };
  }, [index]);

  const safeComponents = (components ?? undefined) as unknown as Record<string, any> | undefined;
  const { className, ...mdRest } = rest as any;

  // 获取当前应该渲染的内容（从开始到当前索引）
  const currentContent = (children as string)?.slice(0, index) || '';

  return (
    <GPTVisContext.Provider value={contextValue}>
      <Button style={{ alignSelf: 'flex-end' }} onClick={() => setIndex(0)}>
        重新渲染
      </Button>
      <XMarkdown
        content={currentContent}
        className={className ?? undefined}
        components={{ ...safeComponents, ...LoadingComponents }}
        streaming={{
          hasNextChunk: isStreaming,
          enableAnimation: true,
          incompleteMarkdownComponentMap: {
            link: 'loading-link',
            image: 'loading-image',
          },
        }}
        {...mdRest}
      />
      {/* <Markdown
        components={components}
        rehypePlugins={[rehypeRaw, ...(rehypePlugins ? rehypePlugins : [])]}
        remarkPlugins={[remarkGfm, ...(remarkPlugins ? remarkPlugins : [])]}
        {...rest}
      >
        {children}
      </Markdown> */}
    </GPTVisContext.Provider>
  );
};

export { useEventPublish };

export default memo(GPTVisLite);
