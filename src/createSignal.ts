import { Accessor, Update } from './types';

export const createSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const effects = new Set<() => void>();
  const getter = () => value;
  getter.addEffect = (fn: () => void) => effects.add(fn);
  getter.removeEffect = (fn: () => void) => effects.delete(fn);

  const setter = (newValue: any) => {
    value = typeof newValue == 'function'
      ? newValue(value) ?? value
      : newValue;
    [...effects].reverse().forEach(fn => fn())
  }

  getter.set = setter;
  setter.get = getter;

  return [getter, setter];
};