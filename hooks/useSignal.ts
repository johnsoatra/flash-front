import Message from "@/constants/message";
import { useCallback, useMemo, useRef } from "react";

function useSignal() {
  const controller = useRef(new AbortController());

  const renew = useCallback(() => {
    controller.current.abort({
      message: Message.AbortError,
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
