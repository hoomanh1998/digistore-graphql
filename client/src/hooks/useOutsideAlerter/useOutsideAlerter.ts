import React, { useEffect, RefObject } from "react";

export function useOutsideAlerter(
  ref: RefObject<HTMLElement>,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  setTouched?: (
    value: boolean,
    shouldValidate?: boolean | undefined
  ) => void | null,
  isSelected?: boolean | null,
  isOpen?: boolean | null
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isOpen && !isSelected) {
          setTouched && setTouched(true);
        }
        setState(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, setState, setTouched, isSelected, isOpen]);
}
