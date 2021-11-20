import { Accessor, Update } from './types';
import { last } from './helpers/last';
import { isIgnored } from './ignore';

export const signalsStack: Accessor[][] = [];

export const createSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const effects = new Set<() => void>();
  const getter: Accessor = () => {
    if (!isIgnored.check) {
      last(signalsStack)?.push?.(getter);
    }
    return value
  };
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