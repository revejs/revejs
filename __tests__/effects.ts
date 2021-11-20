import { createEffect, createSignal, ignore } from '../src';

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
  it('should remove old nested effects', () => {
    const [signal, setSignal] = createSignal(0);
    const res: number[] = [];

    createEffect(() => {
      createEffect(() => {
        createEffect(() => {
          res.push(signal());
        }, [signal])
      }, [signal])()
    }, [signal])()

    setSignal(1);
    setSignal(2);
    setSignal(3);

    expect(res).toEqual([1, 2, 3]);
  });
  it('should listen used signals when deps not defined', () => {
    const [signal, setSignal] = createSignal(0);
    const res: number[] = [];

    createEffect(() => {
      res.push(signal());
    })

    setSignal(1);
    setSignal(2);
    setSignal(3);

    expect(res).toEqual([0, 1, 2, 3]);
  });
  describe('ignore', () => {
    it('should prevent signal from rerunning', () => {
      const [signal, setSignal] = createSignal(0);
      const [ignoredSignal, setIgnoredSignal] = createSignal(0);
      const res: number[] = [];

      createEffect(() => {
        res.push(signal() + ignore(ignoredSignal));
      })

      setSignal(1);
      setSignal(2);
      setSignal(3);
      setIgnoredSignal(1);
      setIgnoredSignal(2);
      setIgnoredSignal(3);

      expect(res).toEqual([0, 1, 2, 3]);
    });
    it('should work with many signals', () => {
      const [signal, setSignal] = createSignal(0);
      const [ignoredSignal, setIgnoredSignal] = createSignal(0);
      const res: number[] = [];

      createEffect(() => {
        res.push(ignore(() => signal() + ignoredSignal()));
      })

      setSignal(1);
      setSignal(2);
      setSignal(3);
      setIgnoredSignal(1);
      setIgnoredSignal(2);
      setIgnoredSignal(3);

      expect(res).toEqual([0]);
    });
  });
});