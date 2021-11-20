import { createEffect, createEmptySignal } from '../src';

describe('emptySignal', () => {
  it('should rerun effect', () => {
    const emit = createEmptySignal();
    const res: number[] = [];

    createEffect(() => {
      res.push(0);
    }, [emit]);

    emit();
    emit();
    emit();

    expect(res).toEqual([0, 0, 0])
  });
});