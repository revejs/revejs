import { Accessor, Update } from '../types';

export const createCarefulSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const effects = new Set<Function>();
  const getter: Accessor = () => value;
  getter.addEffect = (fn: () => void) => effects.add(fn);
  getter.removeEffect = (fn: () => void) => effects.delete(fn);

  return [
    getter,
    (newValue) => {
      const createdNewValue = typeof newValue == 'function'
        ? (newValue as Function)(value) ?? value
        : newValue;

      if (createdNewValue != value) {
        value = createdNewValue;

        effects.forEach(fn => fn())
      }
    },
  ];
};