export interface Update<T = any> {
  (newValue: T): void
  (fn: (value: T) => void): void
  get: Accessor<T>
}

export interface Emitter<T = void> {
  (): T
  addEffect(fn: Function): void
  removeEffect(fn: Function): void
}

export interface Accessor<T = any> extends Emitter<T> {
  set: Update<T>
}

export interface Effect {
  (): void,
  clear(): void
}