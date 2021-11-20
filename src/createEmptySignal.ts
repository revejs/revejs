import { Accessor, Emitter } from './types';
import { isIgnored } from './ignore';
import { last } from './helpers/last';
import { signalsStack } from './createSignal';
import { isEmitter } from './createEffect';

export const bind = (emitter: Accessor<void>) => {
  if (isEmitter(emitter)) {
    if (!isIgnored.check) {
      last(signalsStack)?.push?.(emitter);
    }
  }
  else {
    throw TypeError('given emitter is not actual emitter')
  }
}

export const createEmptySignal = (): Accessor<void> => {
  const effects = new Set<Function>();
  const emitter: Emitter = () => {
    effects.forEach(fn => fn())
  };
  emitter.addEffect = (fn: () => void) => effects.add(fn);
  emitter.removeEffect = (fn: () => void) => effects.delete(fn);

  return emitter;
};