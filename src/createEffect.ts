import { Accessor, Effect } from './types';

export const createEffect = (fn: (effect: Effect) => void, deps: Accessor[]): Effect => {
  const effect = () => fn(effect);
  effect.clear = () => deps.forEach(dep => dep.removeEffect(effect));

  deps.forEach(dep => dep.addEffect(effect));

  return effect;
}