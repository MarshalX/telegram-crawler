export const isTONDomain = (address?: string): boolean => {
  return address?.endsWith('.ton') || false;
};

export const isWeb3Domain = (address?: string): boolean => {
  return address?.endsWith('.t.me') || false;
};
