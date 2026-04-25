import { Label } from "@/constants";
import { useCallback, useMemo, useRef } from "react";

function useSignal() {
  const controller = useRef(new AbortController());

  const renew = useCallback(() => {
    controller.current.abort({
      message: Label.AbortError,
    });
    controller.current = new AbortController();
  }, []);

  return useMemo(() => ({
    get value() {
      return controller.current.signal;
    },
    renew,
  }), []);
}

export default useSignal;
