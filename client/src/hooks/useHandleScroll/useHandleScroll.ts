import { useState, useEffect } from "react";

export const useHandleScroll = () => {
  const [state, setState] = useState({
    prevPageOffset: window.pageYOffset,
    visible: true,
    isOnTop: true,
    isOnBottom: false,
  });
  const { prevPageOffset, visible, isOnTop, isOnBottom } = state;
  useEffect(() => {
    const scrollHandler = () => {
      const currentPageOffset = window.pageYOffset;
      const isOnTop = currentPageOffset < 40 ? true : false;
      let _visible = true;
      if (currentPageOffset > 25) {
        _visible = prevPageOffset > currentPageOffset ? true : false;
      }
      const isOnBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (isOnBottom) {
        setState((prevState) => ({
          ...prevState,
          isOnBottom,
        }));
      }
      setState((prevState) => ({
        ...prevState,
        prevPageOffset: currentPageOffset,
        visible: _visible,
        isOnTop,
        isOnBottom,
      }));
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [prevPageOffset]);

  return { visible, isOnTop, isOnBottom };
};
