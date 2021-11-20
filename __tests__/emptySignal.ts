import { bind, createEffect, createEmptySignal } from '../src';

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
  it('should rerun effect when wrap in bind', () => {
    const emit = createEmptySignal();
    const res: number[] = [];

    createEffect(() => {
      bind(emit);
      res.push(0);
    });

    emit();
    emit();
    emit();

    expect(res).toEqual([0, 0, 0, 0])
  });
});