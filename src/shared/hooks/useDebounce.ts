import { useRef } from "react";

const useDebounce = <F extends (...args: any) => void>(
  f: F,
  delay: number
): ((cond?: boolean, ...args: Parameters<F>) => void) => {
  const handleRef = useRef<number | null>(null);

  return (cond?: boolean, ...args) => {
    if (handleRef.current) {
      clearTimeout(handleRef.current);
    }
    if (cond === undefined || cond) {
      const newTimerHandle = window.setTimeout(() => f(...args), delay);
      handleRef.current = newTimerHandle;
    }
  };
};

export { useDebounce };
