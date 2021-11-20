export const isIgnored = { check: false };


export const ignore = <T>(accessor: () => T) => {
  isIgnored.check = true;
  const value = accessor();
  isIgnored.check = false;
  return value;
}