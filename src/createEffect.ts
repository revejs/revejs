import { Effect, Emitter } from './types';
import { signalsStack } from './createSignal';

export const isEmitter = (emitter: any): emitter is Emitter => emitter?.removeEffect && emitter?.addEffect
export const depsIsEmitters = (deps: any[]): deps is Emitter[] => deps.every(isEmitter)

export const createEffect = (fn: (effect: Effect) => void, deps: any[] = []): Effect => {
  if (depsIsEmitters(deps)) {
    const effect = () => {
      cleaning();
      signalsStack.push(deps.length ? [] : deps)
      fn(effect)
      signalsStack.pop();
    };
    effect.clear = () => deps.forEach(dep => dep.removeEffect(effect));
    const cleaning = signalsStack.length ? effect.clear : () => {};

    if (!deps.length) effect();

    deps.forEach(dep => dep.addEffect(effect));

    return effect;
  }
  else {
    throw TypeError('one of deps is not accessor')
  }

}