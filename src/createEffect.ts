import { Accessor, Effect } from './types';

let context = { length: 0 };

export const createEffect = (fn: (effect: Effect) => void, deps: Accessor[]): Effect => {
  const effect = () => {
    cleaning();
    context.length++
    fn(effect)
    context.length--;
  };
  effect.clear = () => deps.forEach(dep => dep.removeEffect(effect));

  const cleaning = context.length ? effect.clear : () => {};

  deps.forEach(dep => dep.addEffect(effect));

  return effect;
}