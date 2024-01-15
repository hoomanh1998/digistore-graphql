import { useEffect, useRef } from "react";

export const useDidMount = (
  func: (value: React.SetStateAction<boolean>) => void,
  deps?: boolean | undefined
) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      deps ? func(true) : func(false);
    } else {
      didMount.current = true;
      if (deps) {
        setTimeout(() => {
          func(true);
        }, 0);
      } else {
        func(false);
      }
    }
  }, [deps, func]);
};
