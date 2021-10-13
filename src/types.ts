export interface Update<T> {
  (newValue: T): void
  (fn: (newValue: T) => void): void
}

export type Accessor<T = any> = () => T;

export interface Effect {
  getUpdate(): void
  waitAs: Set<Set<Effect>>
}

export type onUpdate = () => void