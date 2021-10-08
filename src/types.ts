export interface Update<T> {
  (newValue: T): void
  (fn: (newValue: T) => void): void
}

export type Parcel<T = any> = () => T;

export interface Receiver {
  getUpdate(): void
  waitAs: Set<Set<Receiver>>
}

export type onUpdate = () => void