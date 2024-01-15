import { useEffect, useState } from "react";
import { ArrowUpIcon } from "../../../assets/svgs";

export const ScrollToTop = () => {
  const [state, setState] = useState({
    prevPageOffset: window.pageYOffset,
    visible: false,
  });

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollHandler = () => {
      const currentPageOffset = window.pageYOffset;
      let _visible = false;
      if (window.pageYOffset > window.innerHeight) {
        _visible = state.prevPageOffset > currentPageOffset ? true : false;
      }
      setState({
        prevPageOffset: currentPageOffset,
        visible: _visible,
      });
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [state.prevPageOffset]);

  return (
    <button
      onClick={scrollToTopHandler}
      className={`btn fixed bottom-scroll-top-button border border-blue-400 dark:border-gray-500 bg-blue-500 dark:bg-gray-600 transition-all duration-150 ease-in-out rounded-full shadow-lg p-4 ${
        state.visible ? "z-40 right-2" : "-z-1 -right-16"
      }`}
    >
      <ArrowUpIcon />
    </button>
  );
};
