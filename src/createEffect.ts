import { Accessor, Effect } from './types';
import { signalsStack } from './createSignal';


export const createEffect = (fn: (effect: Effect) => void, deps: Accessor[] = []): Effect => {
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