import { Parcel, Update, Receiver } from './types';
import { stillUpdatingReceivers  } from "./stillUpdatingReceivers";

export const createDelivery = <T>(value: T): [Parcel<T>, Update<T>] => {
  const deliveryWaitingReceivers = new Set<Receiver>();

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