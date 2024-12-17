import EventEmitter from '@antv/event-emitter';
import React, { memo, useEffect, useMemo } from 'react';
import type { Options } from 'react-markdown';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { GPTVisContext } from './hooks/useContext';
import { useEventPublish } from './hooks/useEvent';

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
  eventSubscribe?: Record<string, (data?: any) => void>;
}

const GPTVisLite: React.FC<GPTVisLiteProps> = ({
  children,
  components,
  rehypePlugins,
  remarkPlugins,
  eventSubscribe: onEvent,
  ...rest
}) => {
  const eventBus = useMemo(() => new EventEmitter(), []);
  const contextValue = useMemo(() => ({ eventBus }), [eventBus]);

  useEffect(() => {
    if (onEvent) {
      const events = Object.keys(onEvent);
      for (const eventName of events) {
        eventBus.on(eventName, onEvent[eventName]);
      }
      return () => {
        for (const eventName of events) {
          eventBus.off(eventName, onEvent[eventName]);
        }
      };
    }
  }, [eventBus, onEvent]);

  return (
    <GPTVisContext.Provider value={contextValue}>
      <Markdown
        components={components}
        rehypePlugins={[rehypeRaw, ...(rehypePlugins ? rehypePlugins : [])]}
        remarkPlugins={[remarkGfm, ...(remarkPlugins ? remarkPlugins : [])]}
        {...rest}
      >
        {children}
      </Markdown>
    </GPTVisContext.Provider>
  );
};

export { useEventPublish };

export default memo(GPTVisLite);
