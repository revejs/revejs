import { Effect, Emitter } from './types';
import { signalsStack } from './createSignal';

const depsIsEmitter = (deps: any[]): deps is Emitter<any>[] => !deps.some(dep => !dep.removeEffect || !dep.addEffect)

export const createEffect = (fn: (effect: Effect) => void, deps: any[] = []): Effect => {
  if (depsIsEmitter(deps)) {
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