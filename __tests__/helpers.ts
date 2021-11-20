import * as faker from 'faker';
import { createStrictArray } from '../src/helpers/strictArray';

describe('helpers', () => {
  describe('strictArray', () => {
    it('should return array of objects', () => {
      const initArray = faker.datatype.array(10).map(() => faker.datatype.number());
      const array = createStrictArray();

      initArray.forEach(array.push);

      expect(array.value).toEqual(initArray)
    });
    it('should not add elements after stop', () => {
      const array = createStrictArray();
      array.push(0);
      array.push(1);
      array.push(2);

      array.stop();

      array.push(0);
      array.push(1);
      array.push(2);

      expect(array.value.length).toBe(3)
    });
    it('should replace values after stop', () => {
      const array = createStrictArray<number>();
      array.push(0);
      array.push(1);
      array.push(2);

      array.stop();

      array.push(3);
      array.push(4);
      array.push(5);

      expect(array.value).toEqual([3, 4, 5])
    });
    it('should run cleanup on change', () => {
      let cleaned: number[] = [];

      const array = createStrictArray<number>();
      array.onClean = (val) => cleaned.push(val)
      array.push(0);
      array.push(1);
      array.push(2);

      array.stop();

      array.push(3);
      array.push(4);
      array.push(5);

      expect(cleaned).toEqual([0, 1, 2])
    });
  });
});