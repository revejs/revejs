import { Parcel } from "./types";
import { createDelivery } from "./createDelivery";
import { createReceiver } from "./createReceiver";

export function createBroker<T>(fn: Parcel<T>) {
  const [s, set] = createDelivery<T | undefined>(undefined);
  createReceiver(() => set(fn()));
  return s as Parcel<T>;
}