export interface Update<T = any> {
  (newValue: T): void
  (fn: (value: T) => void): void
}

export interface Accessor<T = any> {
  (): T
}

export interface Emitter<T = any> extends Accessor<T> {
  addEffect(fn: Function): void
  removeEffect(fn: Function): void
}

export interface Effect {
  (): void,
  clear(): void
}