import { Emitter } from './types';

export const createEmptySignal = () => {
  const effects = new Set<Function>();
  const emitter: Emitter = () => {
    effects.forEach(fn => fn())
  };
  emitter.addEffect = (fn: () => void) => effects.add(fn);
  emitter.removeEffect = (fn: () => void) => effects.delete(fn);

  return emitter;
};