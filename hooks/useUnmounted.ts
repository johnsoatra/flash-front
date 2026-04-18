import { useEffect } from "react";
import useCurrent from "react-use-current";

function useUnmounted() {
  const unmounted = useCurrent(false);

  useEffect(() => {
    unmounted.value = false;
    return () => {
      unmounted.value = true;
    }
  }, []);

  return {
    get value() {
      return unmounted.value;
    },
  }
}

export default useUnmounted;
