import { useMemo } from "react";

export type TimeoutObject<T extends string> = Record<T, NodeJS.Timeout | undefined>;

function useTimeout<T extends string>(
  props: readonly T[],
  options?: Partial<{
    autoClear: boolean
  }>
) {
  return useMemo(() => {
    const store = {} as TimeoutObject<T>;
    const accessors = {} as TimeoutObject<T>;
    for (const key of props) {
      Object.defineProperty(accessors, key, {
        get() {
          return store[key];
        },
        set(timeout) {
          if (options?.autoClear) {
            clearTimeout(store[key]);
          }
          store[key] = timeout;
        },
        enumerable: true,
        configurable: true,
      });
    }
    return accessors;
  }, [props, options]);
}

export default useTimeout;
