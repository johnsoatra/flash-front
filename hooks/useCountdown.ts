import { useEffect, useRef, useState } from "react";

export default function useCountdown() {
  const interval = useRef<NodeJS.Timeout>(undefined);
  const startTime = useRef<number>(undefined);
  const [value, setValue] = useState<number>();

  function start(from: number) {
    clearInterval(interval.current);
    startTime.current = Date.now();
    setValue(from);
    interval.current = setInterval(() => {
      const tick = Math.floor((Date.now() - startTime.current!) / 1000);
      const newValue = from - tick;
      setValue(newValue < 0 ? 0 : newValue);
    }, 1000);
  }
  function stop() {
    clearInterval(interval.current);
  }
  function reset() {
    stop();
    setValue(undefined);
  }

  useEffect(() => {
    if (value === 0) {
      reset();
    }
  }, [value]);

  return {
    value,
    start,
    stop,
  };
}
