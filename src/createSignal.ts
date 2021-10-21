import { Accessor, Update } from './types';

export const createSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const effects: Function[] = [];
  const getter: Accessor = () => value;
  getter.addEffect = (fn: () => void) => effects.push(fn);

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