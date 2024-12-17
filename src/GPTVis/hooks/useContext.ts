import type EventEmitter from '@antv/event-emitter';
import React from 'react';

type GPTVisContextValue = {
  eventBus: EventEmitter;
};

export const GPTVisContext = React.createContext<GPTVisContextValue>(null as any);

export function useGPTVisContext<T = GPTVisContextValue>() {
  const context = React.useContext(GPTVisContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useGPTVisContext must be used within a GPTVisContext.Provider`);
  }

  return context as T;
}
