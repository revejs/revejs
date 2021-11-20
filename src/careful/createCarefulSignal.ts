import { Accessor, Update } from '../types';
import { createSignal } from '../createSignal';

export const createCarefulSignal = <T>(initValue: T): [Accessor<T>, Update<T>] => {
  const [value, setValue] = createSignal(initValue);

  const setter = (newValue: any) => {
    const createdNewValue = typeof newValue == 'function'
      ? (newValue as Function)(value) ?? value
      : newValue;

    if (createdNewValue != value) setValue(createdNewValue)
  }
  setter.get = value;

  return [
    value,
    setter,
  ]
};