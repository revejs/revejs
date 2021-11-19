import { createSignal } from '../src';
import faker from 'faker';

describe('signal', () => {
  it('should return default value', () => {
    const randData = faker.datatype.number();
    const [signal] = createSignal(randData);

    expect(signal()).toBe(randData);
  });
  it('setter should change value', () => {
    const [signal, setSignal] = createSignal(0);
    const randData = faker.datatype.number();

    setSignal(randData);
    expect(signal()).toBe(randData);
  });
  it('should change value by prev', () => {
    const randData1 = faker.datatype.number();
    const [signal, setSignal] = createSignal(randData1);
    const randData2 = faker.datatype.number();

    setSignal(prev => prev + randData2);
    expect(signal()).toBe(randData1 + randData2);
  });
});