import { Accessor, Update, Effect } from './types';
import { stillUpdatingReceivers  } from "./stillUpdatingReceivers";

export const createSignal = <T>(value: T): [Accessor<T>, Update<T>] => {
  const deliveryWaitingReceivers = new Set<Effect>();

  return [
    () => {
      const receiver = stillUpdatingReceivers[stillUpdatingReceivers.length - 1];
      if (receiver) {
        deliveryWaitingReceivers.add(receiver);
        receiver.waitAs.add(deliveryWaitingReceivers);
      }
      return value;
    },
    (newValue) => {
      value = typeof newValue == 'function'
        ? (newValue as Function)(value) ?? value
        : newValue;
      [...deliveryWaitingReceivers].forEach(receiver => receiver.getUpdate())
    },
  ];
};