import { createEffect } from '../src';
import { createSignal } from '../dist';

describe('effects', () => {
  let effectRun = false;
  let effectFn: () => void;
  beforeEach(() => {
    effectRun = false;
    effectFn = () => effectRun = true;
  })
  it('should not run callback on its own', () => {
    createEffect(effectFn, []);

    expect(effectRun).toBeFalsy();
  });
  it('should return callable effect', () => {
    const effect = createEffect(effectFn, []);
    effect();

    expect(effectRun).toBeTruthy();
  });
  it('should run on dep signal change', () => {
    const [signal, setSignal] = createSignal(0);

    createEffect(effectFn, [signal]);

    setSignal(1);

    expect(effectRun).toBeTruthy()
  });
  it('should run on every signal change', () => {
    const [signal, setSignal] = createSignal(0);
    let incrementer = 0;

    createEffect(() => {
      incrementer++;
    }, [signal]);

    setSignal(1);
    setSignal(2);
    setSignal(3);

    expect(incrementer).toBe(3)
  });
  it('should ignore signal on clear', () => {
    const [signal, setSignal] = createSignal(0);
    let incrementer = 0;

    const effect = createEffect(() => {
      incrementer++;
    }, [signal]);

    setSignal(1);
    setSignal(2);

    effect.clear();

    setSignal(3);

    expect(incrementer).toBe(2)
  });

});