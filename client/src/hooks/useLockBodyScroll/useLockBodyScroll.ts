import { useLayoutEffect } from "react";

export const useLockBodyScroll = (elementIsOpen?: boolean): void => {
  useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;
    if (elementIsOpen) {
      document.body.style.overflow = "hidden";
      document.ontouchmove = function (event) {
        event.preventDefault();
      };
    } else {
      document.body.style.removeProperty("overflow");
      document.ontouchmove = function () {
        return true;
      };
    }
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.overflow = "visible";
      document.ontouchmove = function () {
        return true;
      };
    };
  }, [elementIsOpen]);
};
