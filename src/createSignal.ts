import { Accessor, Update } from './types';

export const createSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const effects = new Set<Function>();
  const getter: Accessor = () => value;
  getter.addEffect = (fn: () => void) => effects.add(fn);
  getter.removeEffect = (fn: () => void) => effects.delete(fn);

  return [
    getter,
    (newValue) => {
      value = typeof newValue == 'function'
        ? (newValue as Function)(value) ?? value
        : newValue;
      effects.forEach(fn => fn())
    },
  ];
};