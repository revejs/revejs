import { Accessor, Update } from '../types';

export const createCarefulSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const effects = new Set<() => void>();
  const getter = () => value;
  getter.addEffect = (fn: () => void) => effects.add(fn);
  getter.removeEffect = (fn: () => void) => effects.delete(fn);

  const setter = (newValue: any) => {
    const createdNewValue = typeof newValue == 'function'
      ? (newValue as Function)(value) ?? value
      : newValue;

    if (createdNewValue != value) {
      value = createdNewValue;

      effects.forEach(fn => fn())
    }
  }

  getter.set = setter;
  setter.get = getter;


  return [getter, setter];
};