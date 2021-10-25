export interface Update<T> {
  (newValue: T): void
  (fn: (value: T) => void): void
}

export interface Accessor<T = any> {
  (): T
  addEffect(fn: Function): void
  removeEffect(fn: Function): void
}

export interface Effect {
  (): void,
  clear(): void
}