import { Accessor } from './types';

export const createEmptySignal = (): Accessor<void> => {
  const effects = new Set<Function>();
  const emitter: Accessor = () => {
    effects.forEach(fn => fn())
  };
  emitter.addEffect = (fn: () => void) => effects.add(fn);
  emitter.removeEffect = (fn: () => void) => effects.delete(fn);

  return emitter;
};