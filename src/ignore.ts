import { Accessor } from './types';

export const isIgnored = { check: false };


export const ignore = <T>(accessor: Accessor) => {
  isIgnored.check = true;
  const value = accessor();
  isIgnored.check = false;
  return value;
}