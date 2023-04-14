export const isBrowser = (window: Window): window is Window => {
  return window && typeof window !== 'undefined';
};
