import { useGPTVisContext } from './useContext';

export const useEventPublish = () => {
  const { eventBus } = useGPTVisContext();

  return eventBus.emit.bind(eventBus);
};
