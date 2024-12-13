import React from 'react';

type GPTVisContextValue = Record<string, any>;

export const GPTVisContext = React.createContext<GPTVisContextValue>(null as any);

export function useGPTVisContext<T = GPTVisContextValue>() {
  const context = React.useContext(GPTVisContext);
  if (context === null) {
    throw new Error(`useGPTVisContext must be used within a GPTVisContext.Provider`);
  }

  return context as T;
}
