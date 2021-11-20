import * as faker from 'faker';
import { createMemo, createSignal, ignore } from '../src';

describe('memo', () => {
  it('should return value from callback', () => {
    const randValue = faker.datatype.number();
    const memo = createMemo(() => randValue, []);

    expect(memo()).toBe(randValue)
  });
  it('should change when signal change', () => {
    const [value, setValue] = createSignal(0);

    const res: number[] = [];

    createMemo(() => {
      res.push(value());
    }, [value])

    setValue(1);
    setValue(2);
    setValue(3);


    expect(res).toEqual([0, 1, 2, 3])
  });
  it('should work without deps', () => {
    const [value, setValue] = createSignal(0);

    const res: number[] = [];

    createMemo(() => {
      res.push(value());
    })

    setValue(1);
    setValue(2);
    setValue(3);


    expect(res).toEqual([0, 1, 2, 3])
  });
  it('should change memo only on signal change', () => {
    const [value, setValue] = createSignal(0);

    const res: number[] = [];

    const memo = createMemo(() => {
      res.push(value());
      return value() * 2;
    })

    expect(memo()).toBe(0);
    expect(memo()).toBe(0);
    expect(memo()).toBe(0);
    setValue(1);
    expect(memo()).toBe(2);
    expect(memo()).toBe(2);
    expect(memo()).toBe(2);

    expect(res).toEqual([0, 1])
  });
  it('should ignore values in ignore function', () => {
    const [value, setValue] = createSignal(0);

    const res: number[] = [];

    const memo = createMemo(() => {
      const val = ignore(value);
      res.push(val);
      return val * 2;
    })

    expect(memo()).toBe(0);
    expect(memo()).toBe(0);
    expect(memo()).toBe(0);
    setValue(1);
    expect(memo()).toBe(0);
    expect(memo()).toBe(0);
    expect(memo()).toBe(0);

    expect(res).toEqual([0])
  });
});