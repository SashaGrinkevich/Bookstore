import { useEffect, useRef } from "react";

export const useDidUpdate = (
  CallBack: () => void | (() => void),
  deps: unknown[]
) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      const unmountedCallBack = CallBack();
      return unmountedCallBack?.();
    } else {
      mounted.current = true;
    }
  }, deps);
};
