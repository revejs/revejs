import { Accessor } from './types';

export const createEffect = (fn: () => void, deps: Accessor[]) => {
  deps.forEach(dep => dep.addEffect(fn));

  return fn;
}