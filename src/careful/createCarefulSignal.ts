import { Accessor, Update } from '../types';

export const createCarefulSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const effects: Function[] = [];
  const getter: Accessor = () => value;
  getter.addEffect = (fn: () => void) => effects.push(fn);

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